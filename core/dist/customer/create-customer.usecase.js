"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomerUseCase = void 0;
const customer_1 = require("./customer");
const data_source_1 = require("../data-source");
class CreateCustomerUseCase {
    async execute(customer) {
        const em = await data_source_1.ds.getEntityManager();
        const rawCustomer = em.create(customer_1.Customer, customer);
        await em.insert(customer_1.Customer, rawCustomer);
        return rawCustomer;
    }
}
exports.CreateCustomerUseCase = CreateCustomerUseCase;
//# sourceMappingURL=create-customer.usecase.js.map