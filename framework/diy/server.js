import { Application } from "./src/application.js";
import { CustomerRoutes } from "./src/customers/customer-routes.js";
import { HttpServer } from "./src/http-server.js";

(async()=>{
    const app = new Application();
    await app.registerBootableService(CustomerRoutes);
    await app.registerBootableService(HttpServer);
    app.boot();
})();
