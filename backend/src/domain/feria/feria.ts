export class Feria {
  id?: number;
  nombre: string;
  fecha?: Date;
  ubicacion?: string;
  cupo?: number;
  createdAt?: Date;

  constructor(nombre: string, fecha?: Date, ubicacion?: string, cupo?: number) {
    if (!nombre || nombre.trim() === "") {
      throw new Error("El nombre de la feria no puede estar vacío");
    }
    this.nombre = nombre.trim();
  }
}
