import { Feria } from "@/types/feria";
import { getFerias } from "@/services/api";
import FeriaCard from "@/components/FeriaCard";

export default async function HomePage() {
  let ferias: Feria[] = [];
  try {
    ferias = await getFerias();
  } catch (err) {
    console.error("Error cargando ferias:", err);
  }
  console.log("FERIAS DESDE EL BACK:", ferias);

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Ferias Disponibles</h1>
      <div className="grid gap-4">
        {ferias.map((feria, index) => (
          
          <FeriaCard key={index} feria={feria} />
        ))}
      </div>
    </main>
  );
}
