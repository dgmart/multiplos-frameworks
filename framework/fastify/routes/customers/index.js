import { CustomerModule } from "@multi-framework/core";
const { ListCustomersUseCase, FindCustomerByIdUseCase, CreateCustomerUseCase, UpdateCustomerUseCase } = CustomerModule;

export default async function (fastify, opts) {
    fastify.get('/', async function (request, reply) {
        const usecase = new ListCustomersUseCase();

        return await usecase.execute({
            currentPage: request.query["page"] ?? 1,
            itemsPerPage: request.query["items-per-page"] ?? 10
        });
    });

    fastify.get("/:id", async (request, reply) => {
        const usecase = new FindCustomerByIdUseCase();
        const customer = await usecase.execute(request.params.id);
        if (customer) {
            return customer;
        }

        reply.code(404).type("application/json").send({ message: "Customer not found" });
    });

    fastify.post('/', async function (request, reply) {
        const usecase = new CreateCustomerUseCase();
        const customer = await usecase.execute(request.body);

        return customer;
    });

    fastify.put("/:id", async (request, reply) => {
        try {
            const usecase = new UpdateCustomerUseCase();
            const id = parseInt(request.params.id) || 0;
            if (id) {
                let customer = request.body;
                customer.id = id;
                customer = await usecase.execute(customer);
                if (customer) {
                    return customer;
                }
            }
            reply.code(401).type("application/json").send({ message: "ID must be number" });
        } catch (e) {
            reply.code(404).type("application/json").send({ message: e.message });
        }
    });
}
