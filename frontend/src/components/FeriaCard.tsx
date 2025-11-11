import { Feria } from "@/types/feria";
import Link from "next/link";

interface FeriaCardProps {
  feria: Feria;
}

export default function FeriaCard({ feria }: FeriaCardProps) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-bold">{feria.nombre}</h2>
      <p>Lugar: {feria.direccion}</p>
      <Link
        href={`/feria/${feria.id}`}
        className="mt-2 inline-block bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
      >
        Info
      </Link>
    </div>
  );
}
