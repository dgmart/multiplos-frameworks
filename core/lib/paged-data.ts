export type PagedData<T> = {
    data: T[],
    currentPage: number,
    itemsPerPage: number,
    totalItems: number
}
