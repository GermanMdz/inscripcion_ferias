import { Router } from "express";
import { crearUsuario } from "./usuarioController";

const router = Router();

router.post("/crear", crearUsuario);

export default router;

