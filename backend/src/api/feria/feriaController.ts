import { type Request, type Response } from "express";
import { feriaService } from "./feriaService";

export const crearFeria = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body;
    const feriaCreada = await feriaService.crear(nombre);
    return res.status(201).json(feriaCreada);
  } catch (e: any) {
    return res.status(400).json({ error: e.message });
  }
};

export const inscribirUsuarioAFeria = async (req: Request, res: Response) => {
  
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
