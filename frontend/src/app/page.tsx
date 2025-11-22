"use client";

import { useState } from "react";
import { feriaService } from "@/services/feriaServices";

export default function HomePage() {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    fecha: "",
    horaInicio: "",
    horaFin: "",
    cupo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await feriaService.create({
        nombre: formData.nombre,
        direccion: formData.direccion,
        fecha: formData.fecha,
        horaInicio: formData.horaInicio,
        horaFin: formData.horaFin,
        cupo: Number(formData.cupo),
      });

      alert("Feria creada correctamente ✅");

      setFormData({ 
        nombre: "",
        direccion: "",
        fecha: "",
        horaInicio: "",
        horaFin: "",
        cupo: ""
      });
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Crear una feria :D</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 max-w-md mx-auto space-y-4"
      >
        <div>
          <label className="block mb-1 font-semibold">Nombre de feria</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Fecha</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            placeholder="Ej: 10:00 - 18:00"
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
         <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-semibold">Hora inicio</label>
            <input
              type="time"
              name="horaInicio"
              value={formData.horaInicio}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block mb-1 font-semibold">Hora fin</label>
            <input
              type="time"
              name="horaFin"
              value={formData.horaFin}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Cupo</label>
          <input
            type="number"
            name="cupo"
            value={formData.cupo}
            onChange={handleChange}
            min="1"
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition"
        >
          Crear feria
        </button>
      </form>
    </main>
  );
}
