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
  const [criterio, setCriterio] = useState<"llegada" | "prioridad" | null>(
    null
  );
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
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-purple-700">
          Cargando inscripciones...
        </h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded">
            {error}
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

      <div className="bg-white rounded-lg shadow-lg p-10">
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Usuarios inscriptos en{" "}
            <span className="text-purple-700">{feria?.nombre}</span>
          </h1>

          <button
            onClick={generarListados}
            className="px-6 py-3 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-900 transition-colors shadow-md hover:shadow-lg whitespace-nowrap w-full md:w-auto"
          >
            Generar listados
          </button>
        </div>

        {usuarios.length === 0 ? (
          <p className="text-gray-600 text-lg text-center py-8">
            No hay inscripciones.
          </p>
        ) : (
          <ul className="space-y-4">
            {usuarios.map((u) => (
              <li
                key={u.id}
                className="bg-gray-50 border border-gray-300 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {u.nombre}
                  </p>
                  <p className="text-gray-600">{u.email}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
