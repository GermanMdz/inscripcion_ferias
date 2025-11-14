"use client";

import { useState } from "react";
import { authService } from "@/services/authService";

export default function Login() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    rubro: "",
    telefono: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await authService.register(formData);
      console.log("Usuario registrado:", user);
      setFormData({
        nombre: "",
        email: "",
        password: "",
        rubro: "",
        telefono: "",
      });
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <main className="container mx-auto p-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Crear Cuenta
        </h2>

        {/* Nombre */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="nombre">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Rubro */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Rubro</label>

          <div className="flex gap-4">
            {/* General */}
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="rubro"
                value="general"
                checked={formData.rubro === "general"}
                onChange={handleChange}
                required
              />
              General
            </label>
            {/* Gastronómico */}
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="rubro"
                value="gastronomico"
                checked={formData.rubro === "gastronomico"}
                onChange={handleChange}
                required
              />
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
            value={formData.telefono}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700"
        >
          Registrarse
        </button>
      </form>
    </main>
  );
}
