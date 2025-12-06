const API_URL = process.env.NEXT_PUBLIC_API_URL

export const inscripcionService = {
  subscribe: async (usuarioId: number, feriaId: number) => {
    const token = obtenerToken();
    const res = await fetch(`${API_URL}/feria/inscribir`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420"
      },
      credentials: "include",
      body: JSON.stringify({ usuarioId, feriaId }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Error al inscribirse a la feria: ${errorData.error}`);
    }
    return res.json();
  },

  getSubscriptions: async (id: number) => {
    const token = obtenerToken();
    const res = await fetch(`${API_URL}/feria/${id}/inscripciones`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420"
      },
      credentials: "include",
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Error al obtener las inscripciones de la feria. ${errorData.error}`);
    }
    return res.json();
  },

  generarListados: async (id: number, criterio: string) => {
    const token = obtenerToken();
    const res = await fetch(`${API_URL}/feria/${id}/inscripciones/${criterio}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420"
      },
      credentials: "include",
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Error al obtener las inscripciones de la feria. ${errorData.error}`);
    }
    return res.json();
  }
};

function obtenerToken() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
}
