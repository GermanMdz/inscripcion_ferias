import { Router } from "express";
import { crearFeria, cantidadFeria, obtenerFerias, obtenerFeriaPorId } from "./feriaController";

const router = Router();

router.get("/", obtenerFerias);
router.get("/:id", obtenerFeriaPorId);
router.post("/crear", crearFeria);
router.post("/cantidad", cantidadFeria);

export default router;


