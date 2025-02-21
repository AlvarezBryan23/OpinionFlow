import { Router } from "express";
import { createPublicacionValidator } from "../middlewares/publicaciones-validators.js";
import { savePublicaciones } from "./publicaciones.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();

router.post("/addPublicacion", createPublicacionValidator, savePublicaciones)

export default router;