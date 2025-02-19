import { hash } from "argon2";
import User from "./user.model.js"

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