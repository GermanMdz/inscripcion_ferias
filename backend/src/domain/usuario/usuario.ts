export class Usuario {
    id?: number;
    nombre: string;
    email?: string;
    password?: string;
    role?: 'admin' | 'user';
    rubro?: string | undefined;
    telefono?: string | undefined;
    createdAt?: Date;

    constructor(nombre: string, email: string, password: string) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
    }
}