"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { authService } from "@/services/authService";
import { Usuario } from "@/types/RegisterDto";
import { usePathname } from "next/navigation";
import PerfilDropdown from "./PerfilDropdown";

export default function BotonesAuth() {
  const pathname = usePathname();
  const [user, setUser] = useState<Usuario>();

  useEffect(() => {
    async function fetchUser() {
      try {
        const me = await authService.me();
        setUser(me);
      } catch {
        setUser(undefined);
      }
    }
    fetchUser();
  }, [pathname]);

  if (user) {
    return (
      <PerfilDropdown/>
    );
  }

  return (
    <div className="flex items-center gap-3">
  <Link 
    href="/auth/login" 
    className="px-6 py-2 text-purple-700 font-semibold text-sm hover:text-purple-900 transition-colors duration-300"
  >
    Inicio sesión
  </Link>

  <Link 
    href="/auth/register" 
    className="px-6 py-2 bg-purple-700 text-white font-semibold text-sm rounded hover:bg-purple-900 transition-all duration-300 shadow-sm hover:shadow-md"
  >
    Registrarse
  </Link>
</div>
  );
}
