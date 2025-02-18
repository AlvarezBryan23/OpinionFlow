import User from "../user/user.model.js";

export const existeEmail = async(email) =>{
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`El email ${email} ya fue registrado previamente`)
    }
}