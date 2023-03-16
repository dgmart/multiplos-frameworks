import { AbstractBootableService } from "../abstract-bootable-service.js";
import { HttpRouter } from "../http-router.js";
import { HttpServer } from "../http-server.js";
import { CustomerModule } from "@multi-framework/core";
const { ListCustomersUseCase, FindCustomerByIdUseCase, CreateCustomerUseCase, UpdateCustomerUseCase } = CustomerModule;

export class CustomerRoutes extends AbstractBootableService {
    /**
     * @param {import("../container").Container} container 
     */
    static async build(container) {
        const httpServer = await container.get(HttpServer);

        return new CustomerRoutes(httpServer);
    }

    /**
     * @param {HttpServer} httpServer
     */
    constructor(httpServer) {
        super();

        this._httpServer = httpServer;
    }

    async boot() {
        const router = new HttpRouter("/customers");

        router.get("/", this.listCustomers);
        router.get("/:id", this.findCustomer);
        router.post("/", this.createCustomers);
        router.put("/:id", this.updateCustomer);

        this._httpServer.addRoutes(router);
    }

    /**
     * @param {import("../http-request").HttpRequest} req 
     * @param {import("node:http").ServerResponse} res
     */
    async listCustomers(req, res) {
        const usecase = new ListCustomersUseCase();
        const list = await usecase.execute({
            currentPage: parseInt(req.query.page) || 1,
            itemsPerPage: parseInt(req.query["items-per-page"]) || 10
        });

        res.write(JSON.stringify(list));
    }

    /**
     * @param {import("../http-request").HttpRequest} req 
     * @param {import("node:http").ServerResponse} res
     */
    async findCustomer(req, res) {
        const usecase = new FindCustomerByIdUseCase();
        const customer = await usecase.execute(req.params.id);
        if (customer) {
            return res.write(JSON.stringify(customer));
        }

        res.statusCode = 404
        res.write(JSON.stringify({ message: "Customer not found" }));
    }

    /**
     * @param {import("../http-request").HttpRequest} req 
     * @param {import("node:http").ServerResponse} res
     */
    async createCustomers(req, res) {
        const usecase = new CreateCustomerUseCase();
        const customer = await usecase.execute(req.body);

        res.write(JSON.stringify(customer));
    }

    /**
     * @param {import("../http-request").HttpRequest} req 
     * @param {import("node:http").ServerResponse} res
     */
    async updateCustomer(req, res) {
        try {
            const usecase = new UpdateCustomerUseCase();
            const id = parseInt(req.params.id) || 0;
            if (id) {
                let customer = req.body;
                customer.id = id;
                customer = await usecase.execute(customer);
                if (customer) {
                    return res.write(JSON.stringify(customer));
                }
            }
            res.statusCode = 401
            res.write(JSON.stringify({ message: "Customer not found" }));
        } catch (e) {
            res.statusCode = 404
            res.write(JSON.stringify({ message: "Customer not found" }));
        }
    }
}
