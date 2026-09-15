const DEFAULT_API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api/v1";

interface RequestOptions {
    payload?: Record<string, unknown>;
    headers?: Record<string, string>;
    baseUrl?: string;
}

type HttpMethod = 'GET' | 'PUT' | 'POST' | 'PATCH';

const HttpMethod = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    PATCH: 'PATCH'
} as const satisfies Record<string, HttpMethod>;

class HttpError extends Error {
    status: number;
    statusText: string;
    body: unknown;

    constructor(status: number, statusText: string, body: unknown) {
        super(`HTTP ${status}: ${statusText}`);
        this.status = status;
        this.statusText = statusText;
        this.body = body;
    }
}

function resolveUrl(endpoint: string): string {
    return `${DEFAULT_API_URL}${endpoint}`;
}

function buildHeaders(headers?: Record<string, string>): Record<string, string> {
    return {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...headers,
    };
}

async function request<T>(method: HttpMethod, endpoint: string, options: RequestOptions = {}): Promise<T> {
    const response = await fetch(resolveUrl(endpoint), {
        method,
        headers: buildHeaders(options.headers),
        body: options.payload ? JSON.stringify(options.payload) : undefined,
    });

    const contentType = response.headers.get('content-type') ?? '';
    const body = contentType.includes('application/json') ? await response.json() : await response.text();

    if (!response.ok) {
        throw new HttpError(response.status, response.statusText, body);
    }

    return body as T;
}

const http = () => ({
    get: <T>(endpoint: string, options?: RequestOptions) => request<T>(HttpMethod.GET, endpoint, options),
    post: <T>(endpoint: string, options?: RequestOptions) => request<T>(HttpMethod.POST, endpoint, options),
    put: <T>(endpoint: string, options?: RequestOptions) => request<T>(HttpMethod.PUT, endpoint, options),
});

export default http;
