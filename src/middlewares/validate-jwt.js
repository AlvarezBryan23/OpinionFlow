import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

export const validateJWT = async(req, res, next) =>{
    try{
        let token = req.body.token || req.query.token || req.headers["authorization"]

        if(!token){
            return res.status(401).json({
                success: false,
                message: "No se proporcionó un token en la petición"
            })
        }

        token = token.replace(/^Bearer\s+/, "");

        const { uid } = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findById(uid)

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Usuario no existe"
            })
        }

            if(!user.status){
                return res.status(400).json({
                    message: "El usuario fue desactivado"
                })
            }

            req.usuario = user
            next()
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al validar el token",
            error: err.message
        })
    }
}