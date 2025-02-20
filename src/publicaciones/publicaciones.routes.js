import { Router } from "express";
import { createPublicacionValidator } from "../middlewares/publicaciones-validators.js";
import { savePublicaciones } from "./publicaciones.controller.js";

const router = Router();

router.post("/addPublicacion", createPublicacionValidator, savePublicaciones)

export default router;