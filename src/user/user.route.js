import { Router } from "express";
import { updateUser, updateProfilePictureU } from "./user.controller.js";
import { updateUserValidator, updateProfilePictureValidator } from "../middlewares/user-validator.js";
import { uploadProfilePicture } from "../middlewares/multer-upload.js";

const router = Router();

router.put("/updateUser/:uid", updateUserValidator, updateUser);

router.patch("/updateProfilePicture/:uid", uploadProfilePicture.single("profilePicture"), updateProfilePictureValidator, updateProfilePictureU);

export default router;