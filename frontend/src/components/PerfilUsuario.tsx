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
  <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 className="text-4xl font-bold text-purple-700 mb-8">Mi Perfil</h1>

    <div className="bg-white rounded-lg shadow-lg p-10">
      <div className="space-y-5 text-gray-700">
        <p className="text-lg">
          <span className="font-semibold text-gray-900">Nombre:</span> {user.nombre}
        </p>
        <p className="text-lg">
          <span className="font-semibold text-gray-900">Email:</span> {user.email}
        </p>
        <p className="text-lg">
          <span className="font-semibold text-gray-900">Teléfono:</span> {user.telefono}
        </p>
        <p className="text-lg">
          <span className="font-semibold text-gray-900">Rubro:</span> {user.rubro}
        </p>
      </div>
    </div>
  </main>
);
}
