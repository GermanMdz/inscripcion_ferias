import { feriaService } from "@/services/feriaServices";

export default async function GetFeria({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let feria = null;
  try {
    feria = await feriaService.getById(parseInt(id));
  } catch (e) {
    console.error(e);
  }

  if (!feria) {
    return (
      <main className="container mx-auto p-8">
        <h1 className="text-2xl font-bold text-red-600">Feria no encontrada</h1>
      </main>
    );
  }

  const handleClick = async () => {
    try {
      const data = await feriaService.getById(id); // o el servicio que quieras
      console.log("Respuesta del servicio:", data);
    } catch (error) {
      console.error("Error al llamar al servicio:", error);
    }
  };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{feria.nombre}</h1>
      <p>Lugar: {feria.direccion}</p>
      <p>Fecha: {feria.fecha}</p>
      <p>Hora Inicio: {feria.horaInicio}</p>
      <p>Hora Fin: {feria.horaFin}</p>
      <p>Cupo: {feria.cupo}</p>
      <button onClick={handleClick} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Inscribirse
      </button>
    </main>
  );
}
