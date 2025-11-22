import { crearFeriaRepo, obtenerCantidadRepo, obtenerFeriasRepo, obtenerFeriaPorNombre, obtenerFeriaPorId } from "../../infra/repositories/feriaRepository";
import { obtenerUsuarioPorIdRepo } from "../../infra/repositories/usuarioRepository"
import { obtenerInscripcionRepo, crearInscripcionRepo } from "../../infra/repositories/inscripcionRepository"
import { Feria } from "./feria";
import { Inscripcion } from "../inscripcion/Inscripcion";

export class FeriaService {
    
    async crear(feria: Feria): Promise<Feria> {
        const feriaExiste = await obtenerFeriaPorNombre(feria);
        if (feriaExiste) {
            throw new Error("La feria ya existe");
        }
        return crearFeriaRepo(feria);
    }

    async obtenerFerias(): Promise<Feria[]> {
        const ferias = await obtenerFeriasRepo();
        if (!ferias || ferias.length === 0) {
            throw new Error("No hay ferias registradas");
        }
        return ferias;
    }

    async obtenerProximasFerias(): Promise<Feria[]> {
        const ferias = await this.obtenerFerias();
        const hoy = new Date();
        hoy.setDate(hoy.getDate() - 1); // Para incluir las ferias de hoy
        const proximas = ferias.filter((feria) => {
            if (!feria.fecha) return false;
            const fechaFeria = new Date(feria.fecha);
            return fechaFeria >= hoy;
        });
        return proximas;
    }

    async obtenerFeriaPorId(id: number): Promise<Feria> {
        // Hardcodeo de ejemplo
        const feria = await obtenerFeriaPorId(id);
        if (!feria) {
            throw new Error("Feria no encontrada");
        }
        return feria;
    }    

    async inscribirUsuarioAFeria(usuarioId: number, feriaId: number) {
        const usuario = await obtenerUsuarioPorIdRepo(usuarioId);
        const feria = await obtenerFeriaPorId(feriaId);

        if (!usuario || !feria) throw new Error("Usuario o Feria no existe");
        const inscripcion = new Inscripcion(usuario.id!,feria.id!);

        const existente = await obtenerInscripcionRepo(inscripcion);
        if (existente) {
            throw new Error("La inscripcion ya existe");
        }
        return await crearInscripcionRepo(inscripcion);
    }

    // async obtenerInscripcion(usuarioId: number, feriaId: number) {
    //     const usuario = await obtenerUsuarioPorIdRepo(usuarioId);
    //     const feria = await obtenerFeriaPorId(feriaId);
    //     if (!usuario || !feria) throw new Error("Usuario o Feria no existe");
    //     const inscripcion = new Inscripcion(usuario.id!,feria.id!);
    //     return await obtenerInscripcionRepo(inscripcion);
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
