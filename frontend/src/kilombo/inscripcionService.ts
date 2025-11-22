import { apiFetch } from "./fetchWrapper";

export const inscripcionService = {
  inscribir: (feriaId: number) =>
    apiFetch("/inscripcion", {
      method: "POST",
      body: JSON.stringify({ feriaId }),
    }),

  desinscribir: (feriaId: number) =>
    apiFetch(`/inscripcion/${feriaId}`, { method: "DELETE" }),

  getByFeria: (feriaId: number) =>
    apiFetch(`/inscripcion/feria/${feriaId}`, { method: "GET" }),
};
