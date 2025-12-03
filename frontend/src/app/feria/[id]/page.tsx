"use client";

import { useEffect, useState } from "react";
import { authService } from "@/services/authService";
import { feriaService } from "@/services/feriaServices";
import { inscripcionService } from "@/services/inscripcionService";
import { Feria } from "@/types/feria";
import { useParams } from "next/navigation";
// import { Usuario } from "@/types/RegisterDto";
import Link from "next/link";

export default function GetFeria() {
  const params = useParams();
  const id = parseInt(params.id as string);

  const [feria, setFeria] = useState<Feria>();
  // const [usuarios, setUsuarios] = useState<Usuario[]>();
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

  const handleSubscriptions = async () => {
    // try {
    //   const usuarios = await inscripcionService.getSubscriptions(feria!.id!);
    //   setUsuarios(usuarios);
    //   console.log("Usuarios inscritos:", usuarios);
    // } catch (e) {
    //   const message = e instanceof Error ? e.message : "Error desconocido";
    //   setError(message);
    // }
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
        onClick={handleSubscribe}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Inscribirse
      </button>
      {error && <p className="text-red-500">{error}</p>}
      <br/>
      <Link
        href={`/feria/${feria.id}/inscripciones`}
        className="mt-2 inline-block bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
      >
        Ver inscripciones
      </Link>
    </main>
  );
}
