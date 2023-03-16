import Router from "@koa/router";
import { CustomerModule } from "@multi-framework/core";
const routes = new Router();
const { ListCustomersUseCase, FindCustomerByIdUseCase, CreateCustomerUseCase, UpdateCustomerUseCase } = CustomerModule;

routes.get("/customers", async (ctx, _next) => {
    const usecase = new ListCustomersUseCase();
    const list = await usecase.execute({
        currentPage: parseInt(ctx.request.query["page"]) || 1,
        itemsPerPage: parseInt(ctx.request.query["items-per-page"]) || 10
    });

    ctx.body = list;
});

routes.get("/customers/:id", async (ctx, _next) => {
    const usecase = new FindCustomerByIdUseCase();
    const id = parseInt(ctx.params.id) || 0;
    if (id) {
        const customer = await usecase.execute(id);
        if (customer) {
            return ctx.body = customer;
        }

        ctx.throw(404, JSON.stringify({ message: "Customer not found" }));
    }

    return ctx.throw(404, JSON.stringify({ message: "ID must be number" }));
});

routes.post("/customers", async (ctx, _next) => {
    const usecase = new CreateCustomerUseCase();
    const customer = await usecase.execute(ctx.request.body);
    ctx.body = customer;
});

routes.put("/customers/:id", async (ctx, _next) => {
    try {
        const usecase = new UpdateCustomerUseCase();
        const id = parseInt(ctx.params.id) || 0;
        if (id) {
            let customer = ctx.request.body;
            customer.id = id;
            customer = await usecase.execute(customer);
            if (customer) {
                return ctx.body = customer;
            }
        }
        throw new Error("ID must be number");
    } catch (e) {
        ctx.throw(404, JSON.stringify({ message: e.message }));
    }
});

export default routes;
