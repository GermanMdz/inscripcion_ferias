import { Feria } from "@/types/feria";

const API_URL = "http://localhost:4000";

export const feriaService = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/feria`);
    if (!res.ok) throw new Error("Error al obtener las ferias");
    return res.json();
  },

  getUpcoming: async () => {
    const res = await fetch(`${API_URL}/feria/proximas`);
    if (!res.ok) throw new Error("Error al obtener las ferias");
    return res.json();
  },

  getById: async (id: number) => {
    const res = await fetch(`${API_URL}/feria/${id}`);
    if (!res.ok) throw new Error(`Error al obtener la feria ${id}`);
    return res.json();
  },

  create: async (feria: Feria) => {
    const res = await fetch(`${API_URL}/feria`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feria),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Error al crear la feria: ${errorData.error }`);
    }
    return res.json();
  },

  update: async (id: number, feria: Feria) => {
    const res = await fetch(`${API_URL}/feria/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feria),
    });
    if (!res.ok) throw new Error(`Error al actualizar la feria ${id}`);
    return res.json();
  },

  delete: async (id: number) => {
    const res = await fetch(`${API_URL}/feria/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`Error al eliminar la feria ${id}`);
    return res.json();
  },
};
