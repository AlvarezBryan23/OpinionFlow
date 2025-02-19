import { body, param } from "express-validator";
import { userExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validar-campos.js";
import { deleteFileOnError } from "./delete-file-on-errors.js";
import { handleErrors } from "./handle-errors.js"

export const updateUserValidator = [
    param("uid", "El ID no es válido").isMongoId(),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
]
