import { Feria } from "@/types/feria";

interface FeriaCardProps {
  feria: Feria;
}

export default function FeriaCard({ feria }: FeriaCardProps) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-bold">{feria.nombre}</h2>
      <p>Lugar: {feria.direccion}</p>
    </div>
  );
}
