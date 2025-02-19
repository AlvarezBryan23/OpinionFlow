import { hash, verify } from "argon2";
import User from "./user.model.js"
import fs from "fs/promises"
import {join, dirname} from "path"
import { fileURLToPath } from "url";


const __dirname = dirname(fileURLToPath(import.meta.url))

export const updateUser = async(req, res) =>{
    try{
        const { uid } = req.params;
        const data = req.body;

        const user = await User.findByIdAndUpdate(uid, data, {new: true});

        res.status(200).json({
            success: true,
            message: "Se actualizo el usuario",
            user
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al actualizar al usuario",
            error: err.message
        })
    }
}

export const updatePassword = async (req, res) => {
    try{
        const { uid } = req.params
        const { newPassword } =  req.body
        const { oldPassword } =  req.body
 
        const user = await User.findById(uid)
 
        const matchPassword = await verify(user.password, newPassword)
        const isOldPasswordCorrect = await verify(user.password, oldPassword);
        if (!isOldPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "La contraseña anterior es incorrecta"
            });
        }
        if(matchPassword){
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            })
        }
       
        const encryptedPassword = await hash(newPassword)
 
        await User.findByIdAndUpdate(uid, {password: encryptedPassword})
 
        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada"
        })
 
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        })
    }
}
 

export const updateProfilePictureU = async(req, res) => {
    try{
        const { uid } = req.params
        let newProfilePicture = req.file ? req.file.filename: null

        if(!newProfilePicture){
            return res.status(400).json({
                success: false,
                message: "No hay archivo en la petición"
            })
        }

        const user = await User.findById(uid)

        if(user.profilePicture){
            const oldProfilePicture = join(__dirname, "../../public/uploads/profile-pictures", user.profilePicture)
            await fs.unlink(oldProfilePicture)
        }

        user.profilePicture = newProfilePicture
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Foto actualizada",
            profilePicture: user.profilePicture
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "No se puede actualizar la foto",
            error: err.message
        })
    }
}