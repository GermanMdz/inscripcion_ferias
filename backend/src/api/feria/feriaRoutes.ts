import { Router } from "express";
import { crearFeria, cantidadFeria, obtenerFerias } from "./feriaController";
import { API_ROUTES } from "../../../../shared/routes";

const router = Router();

// router.get("/", obtenerFerias);
router.post(API_ROUTES.feria.crear, crearFeria);
// router.post(API_ROUTES.feria.detalle, detalleFeria);
// router.post(API_ROUTES.feria.obtenerCantidad, cantidadFeria);

export default router;


