import { Feria } from "@/types/feria";
import Link from "next/link";

interface FeriaCardProps {
  feria: Feria;
}

export default function FeriaCard({ feria }: FeriaCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-8">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">{feria.nombre}</h2>
      <p className="text-gray-600 text-base mb-3">📍 {feria.direccion}</p>
      <p className="text-gray-600 text-base mb-6">🕐 {feria.horaInicio} - {feria.horaFin}</p>
      <Link
        href={`/feria/${feria.id}`}
        className="inline-block px-6 py-3 bg-purple-700 text-white font-semibold text-base rounded hover:bg-purple-900 transition-colors"
      >
        Info
      </Link>
    </div>
  );
}