"use client";

import { useState } from "react";

export default function LoginForm({
  onSubmit,
}: {
  onSubmit?: (form: { email: string; password: string }) => void;
}) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // evita redirección SIEMPRE

    if (onSubmit) {
      onSubmit(form); // devuelve email y password al padre
    }
  };

  return (
    <div className="border p-4 rounded shadow max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-3">Login</h2>

      <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
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
