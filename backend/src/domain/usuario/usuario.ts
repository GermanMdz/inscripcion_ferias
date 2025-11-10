export class Usuario {
    id?: number;
    nombre: string;
    email?: string;
    rubro?: string;
    telefono?: string;
    createdAt?: Date;

    constructor(nombre: string) {
        this.nombre = nombre;
    }
}