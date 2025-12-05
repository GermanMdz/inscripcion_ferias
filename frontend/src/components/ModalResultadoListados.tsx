"use client";

import { DatosUsuarioIncripcion } from "@/types/RegisterDto";
import { ArrowUp, ArrowDown } from "lucide-react";

type ResultadoListas = {
  aprobados: DatosUsuarioIncripcion[];
  listaEspera: DatosUsuarioIncripcion[];
  rechazados: DatosUsuarioIncripcion[];
};
type ListaKey = keyof ResultadoListas;

export default function ModalResultadoListados({ open, onClose, resultado, setResultado }: {
  open: boolean; 
  onClose: () => void;
  resultado: {
    aprobados: DatosUsuarioIncripcion[];
    listaEspera: DatosUsuarioIncripcion[];
    rechazados: DatosUsuarioIncripcion[];
  } | null;
  setResultado: (r: ResultadoListas) => void;
}) {
  if (!open || !resultado) return null;
  resultado.aprobados.sort((a, b) => a.nombre.localeCompare(b.nombre));
  resultado.listaEspera.sort((a, b) => a.nombre.localeCompare(b.nombre));
  resultado.rechazados.sort((a, b) => a.nombre.localeCompare(b.nombre));

  const { aprobados, listaEspera, rechazados } = resultado;

  function mover(
    usuario: DatosUsuarioIncripcion,
    desde: ListaKey,
    hacia: ListaKey
  ) {
    const nuevo = {
      aprobados: [...aprobados],
      listaEspera: [...listaEspera],
      rechazados: [...rechazados],
    };

    // quitarlo de la lista actual
    nuevo[desde] = nuevo[desde].filter((u) => u.id !== usuario.id);

    // agregarlo a la nueva lista y ordenarla
    nuevo[hacia].push(usuario);
    nuevo[hacia].sort((a, b) => a.nombre.localeCompare(b.nombre));

    setResultado(nuevo);
  }

  function renderUsuario(
  usuario: DatosUsuarioIncripcion,
  estado: "aprobados" | "listaEspera" | "rechazados"
) {
  return (
    <li
      key={usuario.id}
      className="bg-gray-50 border border-gray-300 rounded-lg p-4 flex justify-between items-center hover:shadow-md transition-shadow"
    >
      <div className="flex-1">
        <p className="font-semibold text-gray-900">{usuario.nombre}</p>
        <p className="text-gray-600 text-sm">{usuario.email}</p>
      </div>

      <div className="flex gap-2">
        {/* FLECHA ARRIBA */}
        {estado !== "aprobados" && (
          <button
            className="p-2 hover:bg-purple-100 text-purple-700 rounded transition-colors"
            onClick={() =>
              mover(
                usuario,
                estado,
                estado === "listaEspera" ? "aprobados" : "listaEspera"
              )
            }
            title="Mover arriba"
          >
            <ArrowUp size={18} />
          </button>
        )}

        {/* FLECHA ABAJO */}
        {estado !== "rechazados" && (
          <button
            className="p-2 hover:bg-red-100 text-red-700 rounded transition-colors"
            onClick={() =>
              mover(
                usuario,
                estado,
                estado === "listaEspera" ? "rechazados" : "listaEspera"
              )
            }
            title="Mover abajo"
          >
            <ArrowDown size={18} />
          </button>
        )}
      </div>
    </li>
  );
}

async function guardarListados() {
  if (!resultado) return;

  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();

  let y = 10;

  doc.setFontSize(18);
  doc.text("Inscripciones", 10, y);
  y += 10;

  function agregarSeccion(titulo: string, lista: DatosUsuarioIncripcion[]) {
    doc.setFontSize(14);
    doc.text(titulo, 10, y);
    y += 8;

    doc.setFontSize(11);
    if (lista.length === 0) {
      doc.text("— Esta lista está vacía —", 12, y);
      y += 6;
    } else {
      lista.forEach((u) => {
        const nameX = 12;
        const minEmailX = 100;
        const spacing = 5;

        const nameDimensions = doc.getTextDimensions(u.nombre);
        const emailX = Math.max(
          minEmailX,
          nameX + nameDimensions.w + spacing
        );

        doc.text(u.nombre, nameX, y);
        doc.text(`tel: ${u.telefono} — ${u.email}`, emailX, y);
        y += 7;
      });
    }

    y += 6;
  }

  agregarSeccion("Confirmados:", resultado.aprobados);
  agregarSeccion("En lista de espera:", resultado.listaEspera);
  agregarSeccion("Rechazados:", resultado.rechazados);

  doc.save("listados.pdf");
  const pdfBase64 = doc.output("datauristring");
  try {
    // await inscripcionService.guardarListados(id, pdfBase64);
    // alert("Listados guardados correctamente.");
  } catch (err) {
    // alert("Error al guardar los listados.");
  }
}

return (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
    <div className="flex flex-col max-w-2xl w-full">
      <div className="bg-white rounded-lg shadow-lg p-8 max-h-[80vh] overflow-y-auto">
        <h2 className="text-3xl font-bold text-purple-700 mb-8">
          Resultado de listados
        </h2>

        {/*CONFIRMADOS*/}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-green-700 mb-4">
            Confirmados ({aprobados.length})
          </h3>
          {aprobados.length === 0 ? (
            <p className="text-gray-500 italic">Ninguno</p>
          ) : (
            <ul className="space-y-3">
              {aprobados.map((u) => renderUsuario(u, "aprobados"))}
            </ul>
          )}
        </section>

        {/*EN ESPERA*/}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-yellow-700 mb-4">
            En espera ({listaEspera.length})
          </h3>
          {listaEspera.length === 0 ? (
            <p className="text-gray-500 italic">Ninguno</p>
          ) : (
            <ul className="space-y-3">
              {listaEspera.map((u) => renderUsuario(u, "listaEspera"))}
            </ul>
          )}
        </section>

        {/*RECHAZADOS*/}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-red-700 mb-4">
            Rechazados ({rechazados.length})
          </h3>
          {rechazados.length === 0 ? (
            <p className="text-gray-500 italic">Ninguno</p>
          ) : (
            <ul className="space-y-3">
              {rechazados.map((u) => renderUsuario(u, "rechazados"))}
            </ul>
          )}
        </section>
      </div>

      <div className="flex gap-4 justify-end pt-4">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-white rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
        >
          Cerrar
        </button>
        {resultado && (
          <button
            onClick={guardarListados}
            className="px-6 py-2 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-900 transition-colors shadow-md"
          >
            Guardar PDF
          </button>
        )}
      </div>
    </div>
  </div>
);
}
