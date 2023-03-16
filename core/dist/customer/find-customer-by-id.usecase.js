"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindCustomerByIdUseCase = void 0;
const customer_1 = require("./customer");
const data_source_1 = require("../data-source");
class FindCustomerByIdUseCase {
    async execute(id) {
        const em = await data_source_1.ds.getEntityManager();
        return await em.getRepository(customer_1.Customer).findOneBy({ id });
    }
}
exports.FindCustomerByIdUseCase = FindCustomerByIdUseCase;
//# sourceMappingURL=find-customer-by-id.usecase.js.map