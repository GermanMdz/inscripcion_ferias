// import { apiFetch } from "../kilombo/fetchWrapper";
// import { Feria } from "@/types/feria";

// export const feriaService = {
//   getUpcoming: async (): Promise<Feria[]> =>
//     apiFetch("/feria/proximas", { method: "GET" }),

//   getAll: async (): Promise<Feria[]> =>
//     apiFetch("/feria", { method: "GET" }),

//   getById: async (id: number): Promise<Feria> =>
//     apiFetch(`/feria/${id}`, { method: "GET" }),

//   create: async (f: Feria) =>
//     apiFetch("/feria", { method: "POST", body: JSON.stringify(f) }),

//   update: async (id: number, f: Feria) =>
//     apiFetch(`/feria/${id}`, { method: "PUT", body: JSON.stringify(f) }),

//   delete: async (id: number) =>
//     apiFetch(`/feria/${id}`, { method: "DELETE" }),
// };
