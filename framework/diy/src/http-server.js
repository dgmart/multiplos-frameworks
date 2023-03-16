import { env } from "node:process";
import { AbstractBootableService } from "./abstract-bootable-service.js";
import { createServer } from "node:http";
import { parse as parseUrl } from "node:url";

export class HttpServer extends AbstractBootableService {
    /**
     * @param {import("./container").Container} container 
     */
    static async build(_container) {
        const port = env.APP_PORT ?? 8005;

        return new HttpServer(port);
    }

    /**
     * @param {number} port
     */
    constructor(port) {
        super();

        this._port = port;
        this._routes = [];
    }

    async boot() {
        if (this.isBooted()) {
            return;
        }
        this._server = createServer((req, res) => {
            const method = req.method;
            if ("undefined" == typeof this._routes[method]) {
                return res.end("Not found");
            }
            const url = parseUrl(req.url, true);
            for (let definition of this._routes[method]) {
                const match = url.pathname.match(definition.regex);
                if (match) {
                    req.query = Object.assign({}, url.query);
                    req.params = {};
                    if (definition.params.length) {
                        for (let index = 0; index < definition.params.length; index++) {
                            req.params[definition.params[index]] = match[index + 1];
                        }
                    }
                    new Promise(rs => {
                        let body = "";
                        req.on("data", chunk => {
                            body += chunk.toString();
                        });
                        req.on("end", () => {
                            if (body) {
                                req.body = JSON.parse(body);
                            }
                            rs();
                        });
                    }).then(() => {
                        definition.handler(req, res)
                            .then(() => {
                                res.end();
                            });
                    });
                }
            }
        });
        this._server.listen(this._port, () => {
            console.log(`http server iniciado na porta ${this._port}`);
        });
        await super.boot();
    }

    /**
     * @param {import("./http-router").HttpRouter} router
     */
    addRoutes(router) {
        for (let method in router.routeList) {
            if ("undefined" == typeof this._routes[method]) {
                this._routes[method] = [];
            }
            for (let definition of router.routeList[method]) {
                this._routes[method].push(definition);
            }
        }
    }
}
