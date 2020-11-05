import Models from "db/models";

function fetchJSON(relativePath: string, data: unknown, method: string) {
    return fetch(`/api/${relativePath}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
}

export function Post(model: Models[keyof Models], data: unknown): Promise<Response> {
    return fetchJSON(model as string, data, "POST");
}

export function Delete(model: Models[keyof Models], data: unknown): Promise<Response> {
    return fetchJSON(model as string, data, "DELETE");
}
