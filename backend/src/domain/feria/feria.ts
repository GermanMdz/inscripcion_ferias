export class Feria {
  id?: number;
  nombre: string;
  fecha?: Date | undefined;
  ubicacion?: string | undefined;
  cupo?: number | undefined;
  createdAt?: Date | undefined;

  constructor(nombre: string, fecha?: Date, ubicacion?: string, cupo?: number) {
    if (!nombre || nombre.trim() === "") {
      throw new Error("El nombre de la feria no puede estar vacío");
    }
    this.nombre = nombre.trim();
    this.fecha = fecha;
    this.ubicacion = ubicacion;
    this.cupo = cupo;
    // this.createdAt = createdAt;
    // this.id = id;
  }
}
