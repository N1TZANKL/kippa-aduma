function fetchJSON(relativePath: string, data: unknown, method: string) {
    return fetch(`/api/${relativePath}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
}

export function Post(relativePath: string, data: unknown): Promise<Response> {
    return fetchJSON(relativePath, data, "POST");
}

export function Delete(relativePath: string, data: unknown): Promise<Response> {
    return fetchJSON(relativePath, data, "DELETE");
}

export function Patch(relativePath: string, data: unknown): Promise<Response> {
    return fetchJSON(relativePath, data, "PATCH");
}

export function Get(relativePath: string): Promise<Response> {
    return fetch(`/api/${relativePath}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
}
