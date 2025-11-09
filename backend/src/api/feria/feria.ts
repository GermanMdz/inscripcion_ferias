// Entidad de dominio (sin dependencias de infraestructura)
export class Feria {
  id?: number;
  nombre: string;
  createdAt?: Date;

  constructor(nombre: string) {
    if (!nombre || nombre.trim() === "") {
      throw new Error("El nombre de la feria no puede estar vacío");
    }
    this.nombre = nombre.trim();
  }
}
