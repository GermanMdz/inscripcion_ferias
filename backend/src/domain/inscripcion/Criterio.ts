import { DatosUsuarioIncripcion as usuario } from "../usuario/usuario";

export abstract class Criterio {

    protected abstract ordenar(u: usuario[]): usuario[];

    generarListados(u: usuario[], cupo: number) {
        const ordenados = this.ordenar(u);
        
        const rechazados = this.obtenerRechazados(ordenados);
        const elegibles = this.obtenerElegibles(ordenados);


        const aprobados = this.obtenerAprobados(elegibles, cupo);
        const listaEspera = this.obtenerListaEspera(elegibles, cupo);

        return { rechazados, aprobados, listaEspera };
    }

    protected obtenerListaEspera(ordenados: usuario[], cupo: number) {
        return ordenados.slice(cupo);
    }

    protected obtenerAprobados(ordenados: usuario[], cupo: number) {
        return ordenados.slice(0, cupo);
    }

    protected obtenerElegibles(u: usuario[]) {
        return u.filter(x => x.ultimaInscripcion !== "rechazado");
    }

    private obtenerRechazados(u: usuario[]) {
        return u.filter(x => x.ultimaInscripcion === "rechazado");
    }
}
