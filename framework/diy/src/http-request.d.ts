import { ClientRequest } from "node:http";

export class HttpRequest extends ClientRequest {
    query: Record<string, string>[];
    params: Record<string, string>[];
}
