"use client";

import { useEffect, useState } from "react";
import { authService } from "@/services/authService";
import { Usuario } from "@/types/RegisterDto";
import { useRouter } from "next/navigation";

export default function PerfilUsuario() {
  const router = useRouter();
  
  const [user, setUser] = useState<Usuario>();

  useEffect(() => {
    async function fetchUser() {
      try {
        const usuario = await authService.me();
        setUser(usuario);
      } catch {
        setUser(undefined);
        router.push("/auth/login");
      }
    }
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return <p>Cargando...</p>;

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Mi Perfil</h1>

      <div className="border rounded p-4">
        <p>
          <strong>Nombre:</strong> {user.nombre}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Teléfono:</strong> {user.telefono}
        </p>
        <p>
          <strong>Rubro:</strong> {user.rubro}
        </p>
      </div>
    </main>
  );
}
