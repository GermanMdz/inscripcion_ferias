import { Router } from "express";
import * as feriaController from "./feriaController";

const router = Router();

router.get("/", feriaController.obtenerFerias);
router.post("/", feriaController.crearFeria);

router.get("/proximas", feriaController.obtenerProximasFerias);
router.post("/cantidad", feriaController.cantidadFeria);
router.get("/:id", feriaController.obtenerFeriaPorId);
// router.post("/crear", feriaController.crearFeria);

export default router;


