export class Usuario {
    id?: number;
    nombre: string;
    email?: string;
    password?: string;
    role?: 'admin' | 'user';
    rubro?: string | undefined;
    ultimaInscripcion?: string;
    telefono?: string | undefined;
    createdAt?: Date;

    constructor(nombre: string) {
        this.nombre = nombre;
    }
}

export interface DatosUsuarioIncripcion{
    id: number;
    nombre: string;
    email: string;
    rubro: string;
    telefono: string;
    ultimaInscripcion: string;
    createdAt: Date;
}