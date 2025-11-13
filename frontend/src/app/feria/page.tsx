import { Feria } from "@/types/feria";
import { feriaService } from "@/services/api";
import FeriaCard from "@/components/FeriaCard";

export default async function Ferias() {
  let ferias: Feria[] = [];
  try {
    ferias = await feriaService.getUpcoming();
  } catch (e) {
    console.error(e);
  }
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Proximas ferias :D</h1>
      <div className="grid gap-4">
        {ferias.map((feria, index) => (

          <FeriaCard key={index} feria={feria} />
        ))}
      </div>
    </main>
  );
}