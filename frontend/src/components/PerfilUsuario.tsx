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
      <h1 className="text-4xl font-bold text-purple-700 mb-10">Mi Perfil</h1>

      <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 space-y-10">
        {/* Header del perfil */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center text-3xl font-bold text-purple-700">
            {user.nombre?.charAt(0)}
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {user.nombre}
            </h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Teléfono</p>
            <p className="text-lg font-medium text-gray-800">
              {user.telefono || "—"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Rubro</p>
            <p className="text-lg font-medium text-gray-800">
              {user.rubro || "—"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
