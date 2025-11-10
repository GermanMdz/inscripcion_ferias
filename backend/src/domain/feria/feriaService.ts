import { crearFeriaRepo, obtenerCantidadRepo, buscarFeria } from "../../infra/repositories/feriaRepository";
import { Feria } from "./feria";

export class FeriaService {
    
    async crear(feria: Feria): Promise<Feria> {
        const feriaExiste = await buscarFeria(feria);
        if (feriaExiste) {
            throw new Error("La feria ya existe");
        }
        return crearFeriaRepo(feria);
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

    async obtenerCantidad(): Promise<{ cantidad: number }> {
        const cantidad = await obtenerCantidadRepo();
        if (cantidad.cantidad === 0) {
            throw new Error("No hay ferias registradas");
        }
        return cantidad;
    }
}

export const feriaService = new FeriaService();
