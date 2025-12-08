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
  <div className="w-full">
    {/* HERO */}
    <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">{feria.nombre}</h1>
        <p className="text-blue-100 text-xl">
          📍 {feria.direccion}
        </p>
      </div>
    </section>

    {/* INFO */}
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Detalles */}
        <div className="bg-white rounded-xl shadow p-6 lg:p-8 
                flex flex-col sm:flex-row sm:items-center sm:justify-around gap-6">

          <div className="flex items-center gap-4">
            <span className="text-2xl">📅</span>
            <div>
              <p className="text-sm text-gray-500">Fecha</p>
              <p className="font-semibold text-gray-800">{feria.fecha}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-2xl">🕐</span>
            <div>
              <p className="text-sm text-gray-500">Horario</p>
              <p className="font-semibold text-gray-800">
                {feria.horaInicio} – {feria.horaFin}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-2xl">👥</span>
            <div>
              <p className="text-sm text-gray-500">Cupo disponible</p>
              <p className="font-semibold text-gray-800">{feria.cupo}</p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        {/* CTA */}
        <div className="bg-white rounded-xl shadow p-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <p className="text-gray-700 text-lg">
            ¿Querés participar de esta feria?
          </p>

          <div className="flex gap-4">
            <button
              onClick={handleSubscribe}
              className="px-8 py-3 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-900 transition-colors shadow-md"
            >
              Inscribirse
            </button>

            <Link
              href={`/feria/${feria.id}/inscripciones`}
              className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              Ver inscripciones
            </Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);

}
