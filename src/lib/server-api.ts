import type { Studio } from "./types";

// Server components talk to Express directly instead of going back through
// the Next.js rewrite. Set API_URL in production.
const API_URL = (process.env.API_URL ?? "http://localhost:5000").replace(
  /\/$/,
  ""
);

export class ServerApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ServerApiError";
    this.status = status;
  }
}

async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { cache: "no-store" });

  if (!response.ok) {
    let message = "The studio service is unavailable right now.";

    try {
      const body = (await response.json()) as {
        error?: { message?: string };
      };
      message = body.error?.message ?? message;
    } catch {
      // Ignore a non-JSON error body.
    }

    throw new ServerApiError(response.status, message);
  }

  return (await response.json()) as T;
}

export async function getStudios(query: string) {
  return apiGet<{ studios: Studio[]; count: number }>(`/api/studios${query}`);
}

export async function getStudio(id: string) {
  try {
    return await apiGet<{ studio: Studio }>(
      `/api/studios/${encodeURIComponent(id)}`
    );
  } catch (error) {
    if (error instanceof ServerApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function getFeaturedStudios() {
  const result = await getStudios("?limit=6");

  return result.studios;
}
