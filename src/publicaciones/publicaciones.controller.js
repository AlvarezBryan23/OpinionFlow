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