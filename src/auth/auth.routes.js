import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { registerValidator, loginValidator } from "../middlewares/check-validators.js";
import { uploadProfilePicture } from "../middlewares/multer-upload.js";
import { deleteFileOnError } from "../middlewares/delete-file-on-errors.js";

const router = Router()

router.post("/register", uploadProfilePicture.single("profilePicture"), registerValidator, deleteFileOnError, register)

router.post("/login", loginValidator, login )

export default router