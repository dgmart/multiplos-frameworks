export class HttpRouter {
    /**
     * @param {string} basePath
     */
    constructor(basePath = "/") {
        this._basePath = basePath;
        this._routes = [];
    }

    get routeList() {
        return this._routes;
    }

    /**
     * 
     * @param {string} type
     * @param {string} path
     * @param {Function} handler
     */
    _emit(type, path, handler) {
        if ("undefined" === typeof this._routes[type]) {
            this._routes[type] = [];
        }
        path = (this._basePath + path).replace(/^\/\//, "/");
        path = path.replace(/\/$/, "");
        let i = 0;
        let pathRegex = "";
        let params = [];
        while (i < path.length) {
            let char = path.charAt(i);
            if (":" == char) {
                let param = "";
                i++;
                while (i < path.length) {
                    char = path.charAt(i);
                    if ("/" == char) {
                        break;
                    }
                    param += char;
                    i++;
                }
                params.push(param);
                char = "(.*)";
            }
            pathRegex += char;
            i++;
        }
        const regex = new RegExp(`${pathRegex}$`);
        this._routes[type].push({
            regex,
            params,
            handler
        });
    }

    /**
     * @param {string} path
     * @param {Function} handler
     */
    get(path, handler) {
        this._emit("GET", path, handler);
    }

    /**
     * @param {string} path
     * @param {Function} handler
     */
    post(path, handler) {
        this._emit("POST", path, handler);
    }

    /**
     * @param {string} path
     * @param {Function} handler
     */
    put(path, handler) {
        this._emit("PUT", path, handler);
    }
}
