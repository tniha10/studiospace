/**
 * Small fetch wrapper for the Express API.
 *
 * Every state-changing request first exchanges the BetterAuth session for a
 * short-lived JWT + CSRF pair (see server/src/routes/mutation-token.routes.ts).
 * The CSRF value is sent back in the X-CSRF-Token header.
 */

type ApiErrorBody = {
  error?: {
    code?: string;
    message?: string;
  };
};

export class ApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

async function toApiError(response: Response): Promise<ApiError> {
  let body: ApiErrorBody = {};

  try {
    body = (await response.json()) as ApiErrorBody;
  } catch {
    // The server may return an empty body (for example on a network error).
  }

  return new ApiError(
    response.status,
    body.error?.code ?? "REQUEST_FAILED",
    body.error?.message ?? "Something went wrong. Please try again."
  );
}

function readCookie(name: string): string {
  if (typeof document === "undefined") {
    return "";
  }

  const match = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));

  return match ? decodeURIComponent(match.slice(name.length + 1)) : "";
}

export async function requestMutationToken(): Promise<string> {
  const response = await fetch("/api/mutation-token", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw await toApiError(response);
  }

  return readCookie("studiospace_csrf");
}

type ApiRequestOptions = RequestInit & {
  /** Set to true for POST, PATCH, PUT and DELETE requests. */
  mutation?: boolean;
};

export async function apiFetch<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { mutation = false, ...init } = options;
  const headers = new Headers(init.headers);

  if (mutation) {
    const csrfToken = await requestMutationToken();
    headers.set("X-CSRF-Token", csrfToken);
  }

  if (init.body && !(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(path, {
    ...init,
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    throw await toApiError(response);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

/** Turns an unknown error into a message that is safe to show in a toast. */
export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}
