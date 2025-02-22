import { Router } from "express";
import { createComentarioValidator } from "../middlewares/comentario-validator.js";
import { saveComentarios} from "../comentarios/comentario.controller.js"

const router = Router()

router.post("/addComentario", createComentarioValidator, saveComentarios)

export default router;