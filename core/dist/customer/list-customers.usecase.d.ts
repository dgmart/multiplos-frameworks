import { PagedData } from "../paged-data";
import { PaginationFilters } from "../pagination-filters";
import { Customer } from "./customer";
export declare class ListCustomersUseCase {
    execute(filters: PaginationFilters): Promise<PagedData<Customer>>;
}
