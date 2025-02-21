import { Router } from "express";
import { createPublicacionValidator, deletePublicacioneValidator, updatePublicacionValidator } from "../middlewares/publicaciones-validators.js";
import { deletePublicacion, savePublicaciones, updatePublicaciones } from "./publicaciones.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();

router.post("/addPublicacion", createPublicacionValidator, savePublicaciones);

router.put("/updatePublicacion/:id", updatePublicacionValidator, updatePublicaciones);

router.delete("/deletePublicacion/:id", deletePublicacioneValidator, deletePublicacion);

export default router;