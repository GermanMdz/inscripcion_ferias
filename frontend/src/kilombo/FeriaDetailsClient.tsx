"use client";

import { useState } from "react";
import { useFeria } from "@/kilombo/useFeria";
import { inscripcionService } from "@/services/inscripcionService";
import { useAuth } from "@/kilombo/authContext";

export default function FeriaDetailsClient({ feriaId }: { feriaId: number }) {
  const { feria, loading, error } = useFeria(feriaId);
  const { user } = useAuth();
  const [loadingIns, setLoadingIns] = useState(false);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!feria) return <div>No encontrada</div>;

  async function handleInscribirse() {
    setLoadingIns(true);
    try {
      await inscripcionService.inscribir(feria!.id!);
      alert("Inscripto correctamente");
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setLoadingIns(false);
    }
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">{feria.nombre}</h1>

      <button
        onClick={handleInscribirse}
        disabled={loadingIns}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-8"
      >
        {loadingIns ? "Inscribiendo..." : "Inscribirse"}
      </button>
    </main>
  );
}
