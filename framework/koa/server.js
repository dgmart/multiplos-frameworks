import Application from "koa";
import { koaBody } from "koa-body";
import customerRoutes from "./src/routes/customer.routes.js";
import { ds } from "@multi-framework/core";

(async () => {
    await ds.init();

    const app = new Application();
    app.use(koaBody());
    app.use(customerRoutes.routes());
    app.listen(8002, () => {
        console.log("app koa iniciado na porta 8002");
    });
})();
