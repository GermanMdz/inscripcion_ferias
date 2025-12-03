"use client";

interface Props {
  open: boolean;
  onClose: () => void;
  criterio: "llegada" | "prioridad" | null;
  setCriterio: (c: "llegada" | "prioridad" | null) => void;
  onConfirm: () => void;
}

export default function ModalSeleccionCriterio({
  open,
  onClose,
  criterio,
  setCriterio,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-80">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Seleccionar criterio</h2>

        <div className="space-y-3">
          <button
            onClick={() => setCriterio("llegada")}
            className={`w-full px-4 py-2 rounded-lg border ${
              criterio === "llegada"
                ? "bg-blue-600 text-white font-semibold"
                : "bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium"
            }`}
          >
            Orden de llegada
          </button>

          <button
            onClick={() => setCriterio("prioridad")}
            className={`w-full px-4 py-2 rounded-lg border ${
              criterio === "prioridad"
                ? "bg-blue-600 text-white font-semibold"
                : "bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium"
            }`}
          >
            Prioridades
          </button>
        </div>

        <div className="flex justify-end mt-5 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-900"
          >
            Cancelar
          </button>

          <button
            disabled={!criterio}
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg ${
              criterio
                ? "bg-blue-600 text-white hover:bg-blue-700 font-semibold"
                : "bg-blue-300 text-white cursor-not-allowed"
            }`}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
