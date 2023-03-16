const { CustomerModule } = require("@multi-framework/core");
const { UpdateCustomerUseCase } = CustomerModule;

module.exports = {
    friendlyName: "Customer",
    description: "Persiste um novo cliente na base",
    inputs: {
    },
    exits: {
    },
    fn: async function (_inputs) {
        try {
            const usecase = new UpdateCustomerUseCase();
            const id = parseInt(this.req.params.id) || 0;
            if (id) {
                let customer = this.req.body;
                customer.id = id;
                customer = await usecase.execute(customer);
                if (customer) {
                    return customer;
                }
            }
            this.res.badRequest("ID must be number");
        } catch (e) {
            this.res.notFound({ message: e.message });
        }
    }
};
