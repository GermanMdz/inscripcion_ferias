import { DatosUsuarioIncripcion as usuario } from "../usuario/usuario";

export abstract class Criterio {

    protected abstract ordenar(u: usuario[]): usuario[];

    generarListados(u: usuario[], cupo: number) {
        const rechazados = this.obtenerRechazados(u);

        const elegibles = this.obtenerElegibles(u);

        const ordenados = this.ordenar(elegibles);

        const aprobados = this.obtenerAprobados(ordenados, cupo);
        const listaEspera = this.obtenerListaEspera(ordenados, cupo);

        return { rechazados, aprobados, listaEspera };
    }

    protected obtenerListaEspera(ordenados: usuario[], cupo: number) {
        return ordenados.slice(cupo);
    }

    protected obtenerAprobados(ordenados: usuario[], cupo: number) {
        return ordenados.slice(0, cupo);
    }

    protected obtenerElegibles(u: usuario[]) {
        return u.filter(x => x.ultimaInscripcion !== "cancelada");
    }

    private obtenerRechazados(u: usuario[]) {
        return u.filter(x => x.ultimaInscripcion === "cancelada");
    }
}
