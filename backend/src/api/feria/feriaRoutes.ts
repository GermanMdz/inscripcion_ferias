import { Router } from "express";
import { crearFeria, cantidadFeria } from "./feriaController";

const router = Router();

router.post("/crear", crearFeria);
router.post("/cantidad", cantidadFeria);

export default router;


