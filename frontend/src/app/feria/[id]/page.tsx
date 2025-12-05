"use client";

import { useEffect, useState } from "react";
import { authService } from "@/services/authService";
import { feriaService } from "@/services/feriaServices";
import { inscripcionService } from "@/services/inscripcionService";
import { Feria } from "@/types/feria";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function GetFeria() {
  const params = useParams();
  const id = parseInt(params.id as string);

  const [feria, setFeria] = useState<Feria>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeria = async () => {
      try {
        const data = await feriaService.getById(id);
        setFeria(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchFeria();
  }, [id]);

  const handleSubscribe = async () => {
    try {
      const usuario = await authService.me();
      console.log("Respuesta del servicio:", usuario);
      await inscripcionService.subscribe(usuario.id, feria!.id!);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error desconocido";
      setError(message);
    }
  };

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-purple-700">Cargando...</h1>
      </main>
    );
  }

  if (!feria) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-purple-700">
          Feria no encontrada
        </h1>
      </main>
    );
  }

  return (
  <div className="px-4 sm:px-6 lg:px-8 py-12">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-12">
        <h1 className="text-4xl font-bold text-purple-700 mb-8">{feria.nombre}</h1>
        
        <div className="space-y-5 mb-8 text-gray-700">
          <p className="text-lg"><span className="font-semibold">📍 Lugar:</span> {feria.direccion}</p>
          <p className="text-lg"><span className="font-semibold">📅 Fecha:</span> {feria.fecha}</p>
          <p className="text-lg"><span className="font-semibold">🕐 Hora:</span> {feria.horaInicio} - {feria.horaFin}</p>
          <p className="text-lg"><span className="font-semibold">👥 Cupo:</span> {feria.cupo}</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={handleSubscribe}
            className="px-6 py-3 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-900 transition-colors shadow-md hover:shadow-lg"
          >
            Inscribirse
          </button>

          <Link
            href={`/feria/${feria.id}/inscripciones`}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors shadow-md hover:shadow-lg"
          >
            Ver inscripciones
          </Link>
        </div>
      </div>
    </div>
  </div>
);
}
