import { PagedData } from "../paged-data";
import { PaginationFilters } from "../pagination-filters";
import { Customer } from "./customer";
import { ds } from "../data-source";

export class ListCustomersUseCase {
    async execute(filters: PaginationFilters): Promise<PagedData<Customer>> {
        const em = await ds.getEntityManager();
        const repo = em.getRepository(Customer);
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
