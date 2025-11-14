// src/services/authFetch.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const isClient = typeof window !== "undefined";

// -------------------------
// GET COOKIES CLIENTE
// -------------------------

function getClientCookie(name: string): string | null {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  return cookie?.split("=")[1] || null;
}

// -------------------------
// GET COOKIES SERVIDOR (ASYNC)
// -------------------------
async function getServerCookie(name: string): Promise<string | null> {
  const { cookies } = await import("next/headers");

  const cookieStore = await cookies(); // ⬅ ahora SÍ es válido
  return cookieStore.get(name)?.value ?? null;
}

// -------------------------
// REFRESH TOKEN
// -------------------------
async function refreshAccessToken(refreshToken: string) {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) return null;

  const data = await res.json();

  if (isClient) {
    document.cookie = `token=${data.token}; path=/`;
    document.cookie = `refreshToken=${data.refreshToken}; path=/`;
  }

  return data.token;
}

// -------------------------
// AUTH FETCH
// -------------------------
export async function authFetch(url: string, options: RequestInit = {}) {
  let token: string | null;
  let refreshToken: string | null;

  if (isClient) {
    token = getClientCookie("token");
    refreshToken = getClientCookie("refreshToken");
  } else {
    token = await getServerCookie("token");
    refreshToken = await getServerCookie("refreshToken");
  }

  if (!token && refreshToken) {
    token = await refreshAccessToken(refreshToken);
  }

  const authHeaders: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers as Record<string, string>),
      ...authHeaders,
    },
  });

  if (res.status === 401 && refreshToken) {
    token = await refreshAccessToken(refreshToken);

    if (!token) return res;

    return fetch(url, {
      ...options,
      headers: {
        ...(options.headers as Record<string, string>),
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return res;
}
