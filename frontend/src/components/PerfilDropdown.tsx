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
    <div className="relative inline-block text-left">
      {/* BOTÓN PRINCIPAL */}
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1 border rounded"
      >
        Perfil
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow">
          <Link
            href="/usuario/perfil"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Ver perfil
          </Link>

          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
