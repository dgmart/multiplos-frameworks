import { realpathSync } from "node:fs";
import AutoLoad from "@fastify/autoload";
import { ds } from "@multi-framework/core";

export default async function (fastify, opts) {
    await ds.init();

    // Do not touch the following lines

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    fastify.register(AutoLoad, {
        dir: realpathSync("./plugins"),
        options: Object.assign({}, opts)
    })

    // This loads all plugins defined in routes
    // define your routes in one of these
    fastify.register(AutoLoad, {
        dir: realpathSync("./routes"),
        options: Object.assign({}, opts)
    })
}
