"use client";

import { useEffect, useState } from "react";
import { Feria } from "@/types/feria";
import { feriaService } from "@/services/api";
import FeriaCard from "@/components/FeriaCard";
import { authService } from "@/services/authService";

export default function Ferias() {
  const [ferias, setFerias] = useState<Feria[]>([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        // 1. LEER COOKIE DESDE CLIENTE
        const refreshToken = getCookie("refreshToken");
        console.log("REFRESH TOKEN:", refreshToken);

        // 2. REFRESH
        const userData = await authService.refresh(refreshToken);
        console.log("USER:", userData);
        setUser(userData);

        // 3. FERIAS
        const data = await feriaService.getUpcoming();
        setFerias(data);
      } catch (e) {
        console.error(e);
      }
    }

    loadData();
  }, []);

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

/* ---- Helper para leer cookie desde el CLIENTE ---- */
function getCookie(name: string): string | undefined {
  const match = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)")
  );
  return match ? match[2] : undefined;
}
