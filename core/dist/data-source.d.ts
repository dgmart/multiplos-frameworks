import { DataSource as TypeOrmDataSource, EntityManager } from "typeorm";
export declare class DataSource {
    private isInitialized;
    private ds;
    private entityManager;
    init(): Promise<void>;
    getDataSource(): Promise<TypeOrmDataSource>;
    getEntityManager(): Promise<EntityManager>;
}
export declare const ds: DataSource;
