import { FrameworkError } from "./framework-error.js";

export class CircularReferenceError extends FrameworkError {
    constructor() {
        super("Referência circular");
    }
}
