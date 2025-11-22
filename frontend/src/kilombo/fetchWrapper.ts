const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function apiFetch(path: string, opts: RequestInit = {}) {
  const url = `${BASE}${path}`;
  const defaultOpts: RequestInit = {
    credentials: "include", // importante para cookies
    headers: { "Content-Type": "application/json" },
    ...opts,
  };

  const res = await fetch(url, defaultOpts);
  if (!res.ok) {
    // intenta parsear body con mensaje de error
    let errMsg = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      if (body?.error) errMsg = body.error;
      else if (body?.message) errMsg = body.message;
    } catch (e) {
      // noop
    }
    throw new Error(errMsg);
  }
  // si no hay body (204), devolver null
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}
