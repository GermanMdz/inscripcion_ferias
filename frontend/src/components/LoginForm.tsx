"use client";

import { authService } from "@/services/authService";
import { LoginDto, RegisterDto } from "@/types/RegisterDto";
import { useState } from "react";

export default function LoginForm() {
  const [error, setError] = useState("");
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const newUser: LoginDto = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const res = await authService.login(newUser.email,newUser.password);
      // window.location.href = "/feria";
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error desconocido";
      setError(message);
    }

    // window.location.href = "/feria";
  }

  return (
    <div className="border p-4 rounded shadow max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-3">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          name="email"
          placeholder="Email"
          // value={form.email}
          // onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          // value={form.password}
          // onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
