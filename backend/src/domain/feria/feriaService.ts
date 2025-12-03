import { crearFeriaRepo, obtenerCantidadRepo, obtenerFeriasRepo, obtenerFeriaPorNombre, obtenerFeriaPorId } from "../../infra/repositories/feriaRepository";
import { obtenerUsuarioPorIdRepo } from "../../infra/repositories/usuarioRepository";
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

    async obtenerInscripciones(feriaId: number) {
        const feria = await obtenerFeriaPorId(feriaId);
        if (!feria) throw new Error("La feria no existe");
        throw new Error("Esta funcionalidad ha sido movida a InscripcionService");
    }

    async obtenerCantidad(): Promise<{ cantidad: number }> {
        const cantidad = await obtenerCantidadRepo();
        if (cantidad.cantidad === 0) {
            throw new Error("No hay ferias registradas");
        }
        return cantidad;
    }
}

export const feriaService = new FeriaService();
