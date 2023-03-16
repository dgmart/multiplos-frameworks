const { CustomerModule } = require("@multi-framework/core");
const { ListCustomersUseCase } = CustomerModule;

module.exports = {
    friendlyName: "CustomerList",
    description: "Lista todos os clientes registrados com paginação",
    inputs: {
        page: {
            description: "Página que será carregada",
            type: "number",
            required: false
        },
        items_per_page: {
            description: "Quantidade de itens a serem carregados",
            type: "number",
            required: false
        }
    },
    exits: {
    },
    fn: async function (inputs) {
        const usecase = new ListCustomersUseCase();
        const list = await usecase.execute({
            currentPage: parseInt(inputs.page) || 1,
            itemsPerPage: parseInt(inputs.items_per_page) || 10
        });

        return list;
    }
};
