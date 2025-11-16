import { RegisterDto } from "@/types/RegisterDto";
// import { authFetch } from "./authFetch";

export const authService = {
    login: async (email: string, password: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(`Error al iniciar sesión: ${errorData.error}`);
        }
        const data = await res.json();
        // document.cookie = `token=${data.token}; path=/;`;
        // document.cookie = `refreshToken=${data.refreshToken}; path=/;`;
        return data;
    },

    register: async (userData: RegisterDto) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(userData),
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`Error al iniciar sesión: ${errorData.error}`);
        }
        const data = await res.json();
        // document.cookie = `token=${data.token}; path=/;`;
        // document.cookie = `refreshToken=${data.refreshToken}; path=/;`;
        return data;
    },

    refresh: async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include",
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`Error al refrescar token: ${errorData.error}`);
        }
        const data = await res.json();
        // document.cookie = `token=${data.token}; path=/;`;
        // document.cookie = `refreshToken=${data.refreshToken}; path=/;`;
        return data;
    },

    me: async (token: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: "include",
            body: JSON.stringify({ token }),
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`Error al obtener datos del usuario: ${errorData.error}`);
        }
        const data = await res.json();
        return data;
    }
}