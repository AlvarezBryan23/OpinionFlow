import { check } from "express-validator";
import { existeEmail } from "../helpers/db-validators.js";
import { validarCampos } from "./validar-campos.js";

export const registerValidator = [
    check("email").custom(existeEmail),
    validarCampos
]