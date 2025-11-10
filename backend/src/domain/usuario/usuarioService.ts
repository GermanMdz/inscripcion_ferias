import { crearUsuarioRepo } from "../../infra/repositories/usuarioRepository";
import { Usuario } from "./usuario";

export class UsuarioService {
    
    async crear(nombre: string): Promise<Usuario> {
        const domain = new Usuario(nombre);
        return await crearUsuarioRepo(domain);
    }

    // async inscribirUsuarioAFeria(userId: number, feriaId: number) {
    //     const usuario = await usuarioRepo.findById(userId);
    //     const feria = await feriaRepo.findById(feriaId);

    //     if (!usuario || !feria) throw new Error("Usuario o Feria no existe");

    //     const inscripcion = new Inscripcion();
    //     inscripcion.usuario = usuario;
    //     inscripcion.feria = feria;

    //     return await inscripcionRepo.save(inscripcion);
    // }
}

export const usuarioService = new UsuarioService();
