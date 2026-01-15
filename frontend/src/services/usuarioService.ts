import { authFetch } from "./authFetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const usuarioService = {
  actualizar: async (id: number, campo:string, valor:string) => {
    const token = obtenerToken();
    const res = await authFetch(`${API_URL}/usuario/actualizar`, "PUT", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ id, campo, valor })
    });
    return setResponce(res);
  },
}

function obtenerToken() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
}
async function setResponce(res: Response) {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
}