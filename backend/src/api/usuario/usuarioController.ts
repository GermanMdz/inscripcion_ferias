import { type Request, type Response } from "express";
import { usuarioService } from "../../domain/usuario/usuarioService";

export const crearUsuario = async (req: Request, res: Response) => {
    try {
        // mapper req.body -> domain
        const { nombre } = req.body;
        const usuarioCreado = await usuarioService.crear(nombre); // al service le paso un domain
        return res.status(201).json(usuarioCreado);
    } catch (e: any) {
        return res.status(400).json({ error: e.message });
    }
};