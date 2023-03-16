import { FrameworkError } from "./error/framework-error.js";

export class AbstractService {
    /**
     * @param {import("./container").Container} container 
     */
    static async build(container) {
        throw new FrameworkError("Método não implementado");
    }

    static getClassSymbol() {
        if ("undefined" === typeof this._classSymbol) {
            this._classSymbol = Symbol(this);
        }

        return this._classSymbol;
    }
}
