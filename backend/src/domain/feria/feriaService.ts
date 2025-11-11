import { crearFeriaRepo, obtenerCantidadRepo, obtenerFerias, obtenerFeriaPorNombre, obtenerFeriaPorId } from "../../infra/repositories/feriaRepository";
import { Feria } from "./feria";

export class FeriaService {
    
    async crear(feria: Feria): Promise<Feria> {
        const feriaExiste = await obtenerFeriaPorNombre(feria);
        if (feriaExiste) {
            throw new Error("La feria ya existe");
        }
        return crearFeriaRepo(feria);
    }

    async obtenerFerias(): Promise<Feria[]> {
        // Hardcodeo de ejemplo
        const ferias = await obtenerFerias();
        if (!ferias || ferias.length === 0) {
            throw new Error("No hay ferias registradas");
        }
        return ferias;
    }

    async obtenerFeriaPorId(id: number): Promise<Feria> {
        // Hardcodeo de ejemplo
        const feria = await obtenerFeriaPorId(id);
        if (!feria) {
            throw new Error("Feria no encontrada");
        }
        return feria;
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
