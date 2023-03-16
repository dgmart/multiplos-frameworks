"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCustomersUseCase = void 0;
const customer_1 = require("./customer");
const data_source_1 = require("../data-source");
class ListCustomersUseCase {
    async execute(filters) {
        const em = await data_source_1.ds.getEntityManager();
        const repo = em.getRepository(customer_1.Customer);
        const qb = repo.createQueryBuilder("c").limit(filters.itemsPerPage).orderBy("c.id", "DESC");
        if (filters.currentPage > 1) {
            const skip = (filters.currentPage - 1) * filters.itemsPerPage;
            qb.offset(skip);
        }
        return {
            totalItems: await qb.getCount(),
            currentPage: filters.currentPage,
            itemsPerPage: filters.itemsPerPage,
            data: await qb.getMany()
        };
    }
}
exports.ListCustomersUseCase = ListCustomersUseCase;
//# sourceMappingURL=list-customers.usecase.js.map