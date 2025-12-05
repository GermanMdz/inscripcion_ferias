"use client";

import { useEffect, useState } from "react";
import { Feria } from "@/types/feria";
import { feriaService } from "@/services/feriaServices";
import FeriaCard from "@/components/FeriaCard";
import { authService } from "@/services/authService";

export default function Ferias() {
  const [ferias, setFerias] = useState<Feria[]>([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await feriaService.getUpcoming();
        setFerias(data);
      } catch (e) {
        console.error(e);
      }
    }

    loadData();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12">
  <h1 className="text-4xl font-bold text-purple-700 mb-10">
    Próximas ferias
  </h1>
  <div className="grid gap-6">
    {ferias.map((feria, index) => (
      <FeriaCard key={index} feria={feria} />
    ))}
  </div>
</div>
  );
}
