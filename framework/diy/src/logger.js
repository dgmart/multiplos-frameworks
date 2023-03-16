import { env } from "node:process";
import { parse } from "stack-trace";
import { AbstractService } from "./abstract-service.js";
import moment from "moment";

export const levels = {
    DEBUG: 0,
    INFO: 1,
    ERROR: 2
};

const strLevels = {
    0: "debug",
    1: "info",
    2: "error"
};

export class Logger extends AbstractService {
    static async build() {
        const label = env.LOGGER_LABEL ?? "app";
        const minLevel = env.LOGGER_MIN_LEVEL ?? levels.INFO;
        const colorize = env.LOGGER_DO_COLORIZE ?? false;
        const withTime = env.LOGGER_WITH_TIME ?? false;

        return new Logger(
            label,
            minLevel,
            "false" === colorize ? false : !!colorize,
            "false" === withTime ? false : !!colorize,
        );
    }

    constructor(label, minLevel, colorize, withTime) {
        super();
        this._label = label.trim();
        this._minLevel = parseInt(minLevel);
        this._doColorize = colorize;
        this._withTime = withTime;
    }

    get minLevel() {
        return this._minLevel;
    }

    withLabel(label) {
        return new Logger(label, this._minLevel, this._doColorize, this._withTime);
    }

    strDetails(details) {
        if (details) {
            return JSON.stringify(details);
        }

        return "[]";
    }

    colorize(level, message) {
        switch (level) {
            case levels.INFO:
                return "\x1b[0;34m" + message + "\x1b[0m";
            case levels.ERROR:
                return "\x1b[0;31m" + message + "\x1b[0m";
        }

        return message;
    }

    commit(level, message, details = null) {
        let time = "";
        if (this._withTime) {
            time = " " + moment().format();
        }
        message = `${this._label}.${strLevels[level]}${time} ${message} ${this.strDetails(details)}`;

        if (this._doColorize) {
            message = this.colorize(level, message);
        }

        console.log(message);

        return message.length;
    }

    debug(message, details = null) {
        if (this._minLevel > levels.DEBUG) {
            return;
        }

        return this.commit(levels.DEBUG, message, details);
    }

    info(message, details = null) {
        if (this._minLevel > levels.INFO) {
            return;
        }

        return this.commit(levels.INFO, message, details);
    }

    error(message, details = null) {
        if (this._minLevel > levels.ERROR) {
            return;
        }

        if (message instanceof Error) {
            let trace = parse(message);
            trace = trace.map(file => {
                return file.getFileName() + ":" + file.getLineNumber() + ":" + file.getColumnNumber();
            });

            return this.commit(levels.ERROR, message.message, trace);
        }

        return this.commit(levels.ERROR, message, details);
    }
}
