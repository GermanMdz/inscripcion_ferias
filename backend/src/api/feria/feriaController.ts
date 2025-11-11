import { type Request, type Response } from "express";
import { feriaService } from "../../domain/feria/feriaService";
import { feriaMapper } from "./feriaMapper";

export const crearFeria = async (req: Request, res: Response) => {
    try {
        const feria = feriaMapper.fromDtoToDomain(req.body);
        const feriaCreada = await feriaService.crear(feria);
        const feriaDto = feriaMapper.fromDomainToDto(feriaCreada);
        return res.status(201).json(feriaDto);
    } catch (e: any) {
        return res.status(400).json({ error: e.message });
    }
};

export const obtenerFerias = async (req: Request, res: Response) => {
    try {
        const ferias = await feriaService.obtenerFerias(); // ahora es array
        const feriasDto = ferias.map(feriaMapper.fromDomainToDto);
        return res.status(200).json(feriasDto); // 200 OK
    } catch (e: any) {
        return res.status(400).json({ error: e.message });
    }
};

export const obtenerFeriaPorId = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id!);
        const feria = await feriaService.obtenerFeriaPorId(id); // ahora es array
        const feriaDto = feriaMapper.fromDomainToDto(feria);
        return res.status(200).json(feriaDto); // 200 OK
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
