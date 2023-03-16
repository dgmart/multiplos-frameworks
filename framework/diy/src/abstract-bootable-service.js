import { AbstractService } from "./abstract-service.js";

export class AbstractBootableService extends AbstractService {
    constructor() {
        super();
        this._booted = false;
    }

    isBooted() {
        return this._booted;
    }

    async boot() {
        this._booted = true;
    }

    async terminate() {
        this._booted = false;
    }
}
