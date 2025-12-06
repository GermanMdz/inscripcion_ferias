import { Feria } from "@/types/feria";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const feriaService = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/feria`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });
    if (!res.ok) throw new Error("Error al obtener las ferias");
    return res.json();
  },

  getUpcoming: async () => {
    const res = await fetch(`${API_URL}/feria/proximas`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json", 
        "ngrok-skip-browser-warning": "69420" // agregar esto para evitar la pantalla de advertencia de ngrok
      },
      
      // credentials: "include"
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Error al obtener las ferias: ${errorData.error}`);
    }
    return res.json();
  },

  getById: async (id: number) => {
    const res = await fetch(`${API_URL}/feria/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "69420" },
      credentials: "include"
    });
    if (!res.ok) throw new Error(`Error al obtener la feria ${id}`);
    return res.json();
  },

  create: async (feria: Feria) => {
    const token = obtenerToken();
    const res = await fetch(`${API_URL}/feria`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420"
      },
      body: JSON.stringify(feria),
      credentials: "include"
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Error al crear la feria: ${errorData.error}`);
    }
    return res.json();
  },

  update: async (id: number, feria: Feria) => {
    const res = await fetch(`${API_URL}/feria/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feria),
      credentials: "include"
    });
    if (!res.ok) throw new Error(`Error al actualizar la feria ${id}`);
    return res.json();
  },

  delete: async (id: number) => {
    const res = await fetch(`${API_URL}/feria/${id}`, {
      method: "DELETE",
      credentials: "include"
    });
    if (!res.ok) throw new Error(`Error al eliminar la feria ${id}`);
    return res.json();
  },

};
function obtenerToken() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
}

