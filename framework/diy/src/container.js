import { CircularReferenceError } from "./error/circular-reference-error.js";

export class Container {
    constructor() {
        this._instances = new Map();
        this._loading = new Map();
    }

    /**
     * @param {import("./abstract-service").AbstractService} serviceClass Aqui deve entrar a própria Classe, o construtor, não a instância
     */
    async get(serviceClass) {
        const classSymbol = serviceClass.getClassSymbol();
        if (!this._instances.has(classSymbol)) {
            if (this._loading.has(classSymbol)) {
                throw new CircularReferenceError(classSymbol);
            }
            this._loading.set(classSymbol, true);
            const instance = await serviceClass.build(this);
            this._instances.set(classSymbol, instance);
            this._loading.delete(classSymbol);

            return instance;
        }

        return this._instances.get(classSymbol);
    }
}
