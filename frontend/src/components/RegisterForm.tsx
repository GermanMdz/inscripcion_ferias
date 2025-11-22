"use client";

import { useState } from "react";
import { authService } from "@/services/authService";
import { RegisterDto } from "@/types/RegisterDto";

export default function RegisterForm() {
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const newUser: RegisterDto = {
      nombre: formData.get("nombre") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      rubro: formData.get("rubro") as string,
      telefono: formData.get("telefono") as string,
    };

    try {
      const res = await authService.register(newUser);
      // window.location.href = "/feria";
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error desconocido";
      setError(message);
    }

    // window.location.href = "/feria";
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <input name="nombre" className="border p-2" placeholder="Nombre" />
      <input name="email" className="border p-2" placeholder="Email" />
      <input
        type="password"
        name="password"
        className="border p-2"
        placeholder="Contraseña"
      />

      {/* Rubro */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Rubro</label>

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="rubro" value="general" required />
            General
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" name="rubro" value="gastronomico" required />
            Gastronómico
          </label>
        </div>
      </div>

      {/* Teléfono */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="telefono">
          Teléfono
        </label>
        <input
          id="telefono"
          name="telefono"
          type="text"
          className="w-full border p-2 rounded"
          required
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button className="bg-blue-600 text-white p-2 rounded">
        Registrarse
      </button>
    </form>
  );
}
