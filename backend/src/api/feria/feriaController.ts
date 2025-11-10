import { type Request, type Response } from "express";
import { feriaService } from "../../domain/feria/feriaService";
import { feriaMapper } from "./feriaMapper";

export const crearFeria = async (req: Request, res: Response) => {
    try {
        const feria = feriaMapper.fromDtoToDomain(req.body);
        const feriaCreada = await feriaService.crear(feria);
        return res.status(201).json(feriaCreada);
    } catch (e: any) {
        return res.status(400).json({ error: e.message });
    }
};

export const inscribirUsuarioAFeria = async (req: Request, res: Response) => {
    try {
        // const inscripcion = await feriaService.inscribirUsuarioAFeria(idUsuario, idFeria);
        // return res.status(201).json(inscripcion);
    } catch (e: any) {
        return res.status(400).json({ error: e.message });
    }
}


// no tiene utilidad, solo para ver funcionamiento
export const cantidadFeria = async (req: Request, res: Response) => {
    try {
        const cantidad = await feriaService.obtenerCantidad();
        return res.status(200).json(cantidad);
    } catch (e: any) {
        return res.status(400).json({ error: e.message });
    }
};
