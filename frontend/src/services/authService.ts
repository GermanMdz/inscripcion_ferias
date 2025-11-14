import { RegisterDto } from "@/types/RegisterDto";
// import { authFetch } from "./authFetch";

export const authService = {
    login: async (email: string, password: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(`Error al iniciar sesión: ${errorData.error}`);
        }
        const data = await res.json();
        document.cookie = `token=${data.token}; path=/;`;
        return data;
    },

    register: async (userData: RegisterDto) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`Error al iniciar sesión: ${errorData.error}`);
        }
        const data = await res.json();
        document.cookie = `token=${data.token}; path=/;`;
        return data;
    },

    refresh: async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
            method: "POST",
            // credentials: "include",
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`Error al refrescar token: ${errorData.error}`);
        }
        const data = await res.json();
        document.cookie = `token=${data.token}; path=/;`;
        return data;
    }
}