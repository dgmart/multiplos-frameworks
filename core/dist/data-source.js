"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ds = exports.DataSource = void 0;
const typeorm_1 = require("typeorm");
const customer_1 = require("./customer");
class DataSource {
    async init() {
        if (!this.isInitialized) {
            this.ds = new typeorm_1.DataSource({
                type: "mysql",
                host: "localhost",
                username: "guest",
                password: "guest",
                database: "multiframework",
                entities: [customer_1.Customer],
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
exports.DataSource = DataSource;
exports.ds = new DataSource();
//# sourceMappingURL=data-source.js.map