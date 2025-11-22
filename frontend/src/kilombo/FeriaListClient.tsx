"use client";

import { useListaFerias } from "@/kilombo/useListaFerias";
import FeriaCard from "../components/FeriaCard";

export default function FeriaListClient() {
  const { ferias, loading, error } = useListaFerias();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="grid gap-4">
      {ferias.map((f) => <FeriaCard key={f.id} feria={f} />)}
    </div>
  );
}
