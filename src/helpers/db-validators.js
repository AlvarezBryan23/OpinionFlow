import User from "../user/user.model.js";

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