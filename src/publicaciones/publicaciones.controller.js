import { hash, verify } from "argon2";
import Publicacion from "../publicaciones/publicaciones.models.js"


export const savePublicaciones = async(req, res) =>{
    try{
        const data = req.body;
        const user = req.usuario;

        if(!user){
            return res.status(404).json({
                message: "Usuario no encontrado"
            })
        }
        
        const publicacion = new Publicacion({
            ...data,
            keep: user._id
        })

        await publicacion.save();

        res.status(200).json({
            success: true,
            publicacion
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al guardar la publicación",
            error: err.message
        })
    }
}