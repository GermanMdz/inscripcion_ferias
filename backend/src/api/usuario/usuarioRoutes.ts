import { Router } from "express";
import { crearUsuario } from "./usuarioController";
import { API_ROUTES } from "../../../../shared/routes";

const router = Router();

router.post(API_ROUTES.usuario.crear, crearUsuario);

export default router;

