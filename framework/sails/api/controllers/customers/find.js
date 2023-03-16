const { CustomerModule } = require("@multi-framework/core");
const { FindCustomerByIdUseCase } = CustomerModule;

module.exports = {
    friendlyName: "Customer",
    description: "Busca um cliente pelo ID",
    inputs: {
        id: {
            description: "ID a ser consultado",
            type: "number",
            required: true
        }
    },
    exits: {
    },
    fn: async function (inputs) {
        const usecase = new FindCustomerByIdUseCase();
        const customer = await usecase.execute(inputs.id);

        return customer;
    }
};
