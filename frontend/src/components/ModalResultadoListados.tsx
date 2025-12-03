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
        className="p-3 border rounded-lg bg-white flex justify-between items-center"
      >
        <div>
          {usuario.nombre} — {usuario.email}
        </div>

        <div className="flex gap-2">
          {/* FLECHA ARRIBA */}
          {estado !== "aprobados" && (
            <button
              className="p-1 bg-gray-100 rounded hover:bg-gray-200"
              onClick={() =>
                mover(
                  usuario,
                  estado,
                  estado === "listaEspera" ? "aprobados" : "listaEspera"
                )
              }
            >
              <ArrowUp size={18} />
            </button>
          )}

          {/* FLECHA ABAJO */}
          {estado !== "rechazados" && (
            <button
              className="p-1 bg-gray-100 rounded hover:bg-gray-200"
              onClick={() =>
                mover(
                  usuario,
                  estado,
                  estado === "listaEspera" ? "rechazados" : "listaEspera"
                )
              }
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

    // Obtener PDF en base64
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
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[450px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Resultado de listados
        </h2>

        {/*CONFIRMADOS*/}
        <section className="mb-6">
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            Confirmados:
          </h3>
          {aprobados.length === 0 ? (
            <p className="text-gray-500 italic">Ninguno</p>
          ) : (
            <ul className="space-y-2">
              {aprobados.map((u) => renderUsuario(u, "aprobados"))}
            </ul>
          )}
        </section>

        {/*EN ESPERA*/}
        <section className="mb-6">
          <h3 className="text-xl font-semibold text-yellow-700 mb-2">
            En espera:
          </h3>
          {listaEspera.length === 0 ? (
            <p className="text-gray-500 italic">Ninguno</p>
          ) : (
            <ul className="space-y-2">
              {listaEspera.map((u) => renderUsuario(u, "listaEspera"))}
            </ul>
          )}
        </section>

        {/*RECHAZADOS*/}
        <section>
          <h3 className="text-xl font-semibold text-red-700 mb-2">
            Rechazados:
          </h3>
          {rechazados.length === 0 ? (
            <p className="text-gray-500 italic">Ninguno</p>
          ) : (
            <ul className="space-y-2">
              {rechazados.map((u) => renderUsuario(u, "rechazados"))}
            </ul>
          )}
        </section>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Cerrar
          </button>
          {resultado && (
            <button
              onClick={guardarListados}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Guardar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
