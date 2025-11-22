"use client";

import { useEffect, useState } from "react";
import { authService } from "@/services/authService";
import { feriaService } from "@/services/feriaServices";
import { Feria } from "@/types/feria";
import { useParams } from "next/navigation";

export default function GetFeria() {
  const params = useParams(); // <-- ahora sí
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

  const handleClick = async () => {
    try {
      const usuario = await authService.me();
      console.log("Respuesta del servicio:", usuario);
      await feriaService.subscribe(usuario.id, feria!.id!);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error desconocido";
      setError(message);
    }
  };

  if (loading) {
    return (
      <main className="container mx-auto p-8">
        <h1 className="text-xl">Cargando...</h1>
      </main>
    );
  }

  if (!feria) {
    return (
      <main className="container mx-auto p-8">
        <h1 className="text-2xl font-bold text-red-600">Feria no encontrada</h1>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{feria.nombre}</h1>
      <p>Lugar: {feria.direccion}</p>
      <p>Fecha: {feria.fecha}</p>
      <p>Hora Inicio: {feria.horaInicio}</p>
      <p>Hora Fin: {feria.horaFin}</p>
      <p>Cupo: {feria.cupo}</p>

      <button
        onClick={handleClick}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Inscribirse
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </main>
  );
}
