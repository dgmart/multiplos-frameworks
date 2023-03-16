import { DataSource as TypeOrmDataSource, EntityManager } from "typeorm";
import { Customer } from "./customer";

export class DataSource {
    private isInitialized: boolean;
    private ds: TypeOrmDataSource;
    private entityManager: EntityManager;

    async init() {
        if (!this.isInitialized) {
            this.ds = new TypeOrmDataSource({
                type: "mysql",
                host: "localhost",
                username: "guest",
                password: "guest",
                database: "multiframework",
                entities: [Customer],
                synchronize: true
            });
            await this.ds.initialize();
            this.entityManager = this.ds.createEntityManager();
            this.isInitialized = true;
        }
    }

    async getDataSource() {
        await this.init();

        return this.ds;
    }

    async getEntityManager() {
        await this.init();

        return this.entityManager;
    }
}

export const ds = new DataSource();
