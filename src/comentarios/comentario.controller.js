"use strict"

import Comentarios from "../comentarios/comentarios.model.js"
import Publicacion from "../publicaciones/publicaciones.models.js"

export const saveComentarios = async(req, res) =>{
    try{
        const data = req.body;
        const publicacion = req.publicacion;

        
        if(!publicacion){
            return res.status(400).json({
                success: false,
                message: "Publicacion no encontrada"
            });
        }

        const comentarios = new Comentarios({
            ...data,
            keeper: publicacionId.id
        });

        await comentarios.save();

        res.status(200).json({
            success: true,
            comentarios
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al guardar el comentario",
            error: err.message
        })
    }
}