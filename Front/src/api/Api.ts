
type HttpMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export class FetchError extends Error {
    readonly response: Response;

    constructor(response: Response) {
        super(response.statusText);
        this.response = response.clone();
    }
}

export function queryParams(params: any): string {
    return Object.keys(params)
        .filter(k => params[k] !== undefined)
        .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(typeof params[k] === "object"
            ? JSON.stringify(params[k])
            : params[k])}`)
        .join("&");
}

async function fetchUrl<TParams = any, TResponse = any>(httpMethod: HttpMethods, url: string, params?: TParams): Promise<TResponse> {
    url = (`/api/${url}`).replace("//", "/");

    if (params)
        url += (url.indexOf("?") === -1 ? "?" : "&") + queryParams(params);

    const response = await fetch(url, {method: httpMethod});

    if (response.ok)
        return response.json();

    throw new FetchError(response);
}

export async function get<TParams = any, TResponse = any>(url: string, params?: TParams): Promise<TResponse> {
    return fetchUrl("GET", url, params);
}

export async function sendDelete<TParams = any, TResponse = any>(url: string, params?: TParams): Promise<TResponse> {
    return fetchUrl("DELETE", url, params);
}

async function fetchUrlWithBody<TBody = any, TResponse = any>(url: string, body: TBody, httpMethod: HttpMethods): Promise<TResponse> {
    url = `/api/${url}`;

    const response = await fetch(url, {
        method: httpMethod,
        body: JSON.stringify(body),
    });

    if (!response.ok)
        throw new FetchError(response);

    return response.json();
}

export async function post<TBody = any, TResponse = any>(url: string, body: TBody,): Promise<TResponse> {
    return fetchUrlWithBody(url, body, "POST");
}

export async function patch<TBody = any, TResponse = any>(url: string, body: TBody,): Promise<TResponse> {
    return fetchUrlWithBody(url, body, "PATCH");
}

export async function put<TBody = any, TResponse = any>(url: string, body: TBody,): Promise<TResponse> {
    return fetchUrlWithBody(url, body, "PUT");
}

export async function uploadFile(url: string, file: File) {
    const fd = new FormData();
    fd.append("file", file);

    const response = await fetch(`/api/${url}`, {
        method: "POST",
        body: fd,
    });

    if (!response.ok) throw new FetchError(response);

    return response.json();
}

