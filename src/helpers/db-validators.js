import User from "../user/user.model.js";
import Publicacion from "../publicaciones/publicaciones.models.js";

export const existeEmail = async(email) =>{
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`El email ${email} ya fue registrado previamente`)
    }
}

export const userExists = async(uid = " ") =>{
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error("No existe el usuairo con el ID proporcionado")
    }
}

export const publicacionExists = async(id = "") =>{
    const existePublicacion = await Publicacion.findById(id)
    if(!existePublicacion){
        throw new Error(`La publicación con el ID ${id} no existe`)
    }
}