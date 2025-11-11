import { Feria } from "@/types/feria";

const API_URL = "http://localhost:4000";

export async function getFerias(): Promise<Feria[]> {
  const res = await fetch(`${API_URL}/ferias`);
  if (!res.ok) {
    throw new Error("Error al cargar las ferias");
  }
  const data = await res.json();
  return data as Feria[];
}
