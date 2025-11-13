import { Router } from "express";
import * as usuarioController from "./usuarioController";

const router = Router();

router.get("/perfil", usuarioController.verPerfil);
router.post("/perfil", usuarioController.actualizarPerfil);

export default router;

