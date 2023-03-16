import { Container } from "./container.js";
import { Logger } from "./logger.js";

export class Application {
    constructor() {
        process.on("uncaughtException", async error => { await this.terminate(error) });
        process.on("unhandledRejection", async (reason, _) => { await this.terminate(reason) });
        process.on("SIGTERM", async () => { await this.terminate("Processo encerrado pelo usuário") });

        this._container = new Container();
        /** @type {import("./abstract-bootable-service").AbstractBootableService[]} */
        this._services = [];
    }

    async registerBootableService(serviceClass) {
        const instance = await this._container.get(serviceClass);
        this._services.push(instance);
    }

    async boot() {
        (await this._container.get(Logger)).info("Iniciando aplicação");
        for (let service of this._services) {
            await service.boot();
        }
    }

    async terminate() {
        try {
            // encerra serviços na ordem inversa do boot
            for (let i = this._services.length - 1; i > 0; i--) { // TODO: isso aqui tá certo?
                const service = this._services[i];
                if (service.isBooted()) {
                    await service.terminate();
                }
            }

            // logga e encerra a própria aplicação
            /** @type {Logger} */
            const logger = await this._container.get(Logger);
            if (arguments[0]) {
                if (arguments[0] instanceof Error) {
                    logger.error(arguments[0]);
                    process.exit(1);
                }
                logger.info(arguments[0]);
            } else {
                logger.info("Aplicação encerrada sem informações adicionais");
            }
            process.exit(0);
        } catch (e) {
            console.log(e);
            process.exit(1);
        }
    }
}
