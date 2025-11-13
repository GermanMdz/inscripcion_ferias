import { Router } from "express";
import * as feriaController from "./feriaController";

const router = Router();

router.get("/", feriaController.obtenerFerias);
router.get("/proximas", feriaController.obtenerProximasFerias);
router.post("/", feriaController.crearFeria);
router.get("/:id", feriaController.obtenerFeriaPorId);
router.post("/crear", feriaController.crearFeria);
router.post("/cantidad", feriaController.cantidadFeria);

export default router;


