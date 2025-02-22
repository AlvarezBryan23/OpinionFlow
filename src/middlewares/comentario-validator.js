import { body, param } from "express-validator"
import { validarCampos } from "./validar-campos.js"
import { handleErrors } from "./handle-errors.js"
import { publicacionExists } from "../helpers/db-validators.js"

export const createComentarioValidator = [
    body("opiniones").notEmpty().withMessage("La opinion es requerida"),
    body("informacion").notEmpty().withMessage("La informacion es necesaria"),
    param("id").isMongoId().withMessage("El id de la publicacion no es válido").custom(publicacionExists),
    validarCampos,
    handleErrors
]