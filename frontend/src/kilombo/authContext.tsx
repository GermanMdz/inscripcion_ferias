"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Usuario } from "@/types/RegisterDto";
import { authService } from "@/services/authService";

type AuthContextType = {
  user: Usuario | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: { nombre: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refresh = async () => {
    try {
      const data = await authService.refresh();
      const me = await authService.me(data?.token ?? undefined);
      setUser(me.user || me.usuario || me);
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await authService.login(email, password);
    await refresh();
    return data;
  };

  const register = async (payload: { nombre: string; email: string; password: string }) => {
    const data = await authService.register(payload);
    await refresh();
    return data;
  };

  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      //
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
