"use strict"

import Publicacion from "../publicaciones/publicaciones.models.js";
import User from "../user/user.model.js";

export const savePublicaciones = async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findOne({ email: data.email });

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'Propietario no encontrado' 
            });
        }

        const publicacion = new Publicacion({
            ...data,
            keep: user._id,
        });

        await publicacion.save();

        res.status(200).json({
            success: true,
            publicacion
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al guardar la mascota',
            error
        });
    }
}


export const updatePublicaciones = async(req, res) =>{
    try{
        const { id } = req.params;
        const data = req.body;

        const publicacion = await Publicacion.findByIdAndUpdate(id, data, {new: true})

        res.status(200).json({
            success: true,
            message: "Tu publicación se actualizo",
            publicacion,
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al actualizar tu publicación",
            error: err.message
        })
    }
}

export const deletePublicacion = async(req, res) =>{
    try{
        const { id } = req.params;

        await Publicacion.findByIdAndDelete(id, {status: false})

        res.status(200).json({
            success: true,
            message: "Publicación eliminada"
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la publicación',
            err
        })
    }
}