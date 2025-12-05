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
  <main className="px-4 sm:px-6 lg:px-8 py-12">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-purple-700 mb-8">Crear una feria</h1>

      <div className="bg-white rounded-lg shadow-lg p-12">
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre de feria
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-700 focus:ring-2 focus:ring-purple-700 focus:ring-opacity-20 transition-all placeholder:text-gray-400 text-gray-900"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Fecha
          </label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-700 focus:ring-2 focus:ring-purple-700 focus:ring-opacity-20 transition-all text-gray-900"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Hora inicio
            </label>
            <input
              type="time"
              name="horaInicio"
              value={formData.horaInicio}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-700 focus:ring-2 focus:ring-purple-700 focus:ring-opacity-20 transition-all text-gray-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Hora fin
            </label>
            <input
              type="time"
              name="horaFin"
              value={formData.horaFin}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-700 focus:ring-2 focus:ring-purple-700 focus:ring-opacity-20 transition-all text-gray-900"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Dirección
          </label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-700 focus:ring-2 focus:ring-purple-700 focus:ring-opacity-20 transition-all placeholder:text-gray-400 text-gray-900"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cupo
          </label>
          <input
            type="number"
            name="cupo"
            value={formData.cupo}
            onChange={handleChange}
            min="1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-700 focus:ring-2 focus:ring-purple-700 focus:ring-opacity-20 transition-all text-gray-900"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-700 text-white font-semibold py-3 rounded-lg hover:bg-purple-900 transition-all duration-300 shadow-md hover:shadow-lg mt-8"
        >
          Crear feria
        </button>
      </form>
    </div>
    </div>
  </main>
);
}
