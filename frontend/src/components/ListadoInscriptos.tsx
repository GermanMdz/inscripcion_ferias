"use client";

import { useEffect, useState } from "react";
import { inscripcionService } from "@/services/inscripcionService";
import { Usuario, DatosUsuarioIncripcion } from "@/types/RegisterDto";
import { useParams } from "next/navigation";
import { feriaService } from "@/services/feriaServices";
import { Feria } from "@/types/feria";
import ModalCriterio from "@/components/ModalCriterioDeOrden";
import ModalResultadoListados from "@/components/ModalResultadoListados";

export default function ListadoInscriptos() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [feria, setFeria] = useState<Feria>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [criterio, setCriterio] = useState<"llegada" | "prioridad" | null>(null);
  const [resultado, setResultado] = useState<{
    aprobados: DatosUsuarioIncripcion[];
    listaEspera: DatosUsuarioIncripcion[];
    rechazados: DatosUsuarioIncripcion[];
  } | null>(null);
const [showResultado, setShowResultado] = useState(false);


  async function generarListados() {
    setShowModal(true);
  }

  async function confirmarGeneracion() {
    if (!criterio) return;

    try {
      setError("");
      const listados = await inscripcionService.generarListados(id, criterio);
      setResultado(listados);
      setShowResultado(true);
      setShowModal(false);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error desconocido";
      setError(message);
      setShowModal(false);
    }
  }

  useEffect(() => {
    async function load() {
      try {
        const data = await inscripcionService.getSubscriptions(id);
        setFeria(await feriaService.getById(id));
        setUsuarios(data);
      } catch (e) {
        const message = e instanceof Error ? e.message : "Error desconocido";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <main className="container mx-auto p-8">
        <h1 className="text-xl">Cargando Inscripciones...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
          <div className="p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
            {error}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <ModalCriterio
        open={showModal}
        criterio={criterio}
        setCriterio={setCriterio}
        onClose={() => setShowModal(false)}
        onConfirm={confirmarGeneracion}
      />
      <ModalResultadoListados
        open={showResultado}
        onClose={() => setShowResultado(false)}
        resultado={resultado}
        setResultado={setResultado}
      />


      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Usuarios inscriptos en la feria{" "}
            <span className="text-blue-600">{feria?.nombre}</span>
          </h1>

          <button
            onClick={generarListados}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          >
            Generar listados
          </button>
        </div>

        {usuarios.length === 0 ? (
          <p className="text-gray-600 italic">No hay inscripciones.</p>
        ) : (
          <ul className="space-y-4">
            {usuarios.map((u) => (
              <li
                key={u.id}
                className="p-4 border rounded-xl bg-gray-100 flex items-center justify-between"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {u.nombre}
                  </p>
                  <p className="text-gray-600">{u.email}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
