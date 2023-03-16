const { CustomerModule } = require("@multi-framework/core");
const { CreateCustomerUseCase } = CustomerModule;

module.exports = {
    friendlyName: "Customer",
    description: "Persiste um novo cliente na base",
    inputs: {
    },
    exits: {
    },
    fn: async function (_inputs) {
        const usecase = new CreateCustomerUseCase();
        const customer = await usecase.execute(this.req.body);

        return customer;
    }
};
