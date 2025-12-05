"use client";

import { useState } from "react";
import Link from "next/link";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function PerfilDropdown() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  async function logout() {
    await authService.logout();
    router.push("/auth/login");
  }
  return (
    <div className="relative">
      {/* BOTÓN PRINCIPAL */}
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 text-purple-700 font-semibold text-sm hover:text-purple-900 transition-colors"
      >
        Perfil
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <Link
            href="/usuario/perfil"
            className="block px-4 py-3 text-gray-700 hover:bg-gray-50 font-medium transition-colors border-b border-gray-200"
            onClick={() => setOpen(false)}
          >
            Ver perfil
          </Link>

          <button
            onClick={logout}
            className="w-full text-left px-4 py-3 text-red-700 hover:bg-red-50 font-medium transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
