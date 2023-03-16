"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomerUseCase = void 0;
const customer_1 = require("./customer");
const data_source_1 = require("../data-source");
class UpdateCustomerUseCase {
    async execute(customer) {
        const em = await data_source_1.ds.getEntityManager();
        const rawCustomer = await em.preload(customer_1.Customer, customer);
        if (rawCustomer) {
            await em.save(rawCustomer);
            return rawCustomer;
        }
        throw new Error("Customer not found");
    }
}
exports.UpdateCustomerUseCase = UpdateCustomerUseCase;
//# sourceMappingURL=update-customer.usecase.js.map