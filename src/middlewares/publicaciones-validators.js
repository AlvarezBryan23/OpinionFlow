import { body, param } from "express-validator";
import { publicacionExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validar-campos.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "../middlewares/validate-role.js";
import { handleErrors } from "./handle-errors.js";

export const createPublicacionValidator = [
    body("titulo").notEmpty().withMessage("El titulo es requerido"),
    body("categoria").notEmpty().withMessage("La categoria es requerida"),
    body("textoPrincipal").notEmpty().withMessage("El testo principal es requerido"),
    validarCampos,
    handleErrors
]

export const updatePublicacionValidator = [
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(publicacionExists),
    validarCampos,
    handleErrors
]