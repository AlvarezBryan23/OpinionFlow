import { Schema, model} from "mongoose";

const publicacionesSchema = Schema({
    titulo:{
        type:String,
        required: [true, "El titulo es obligatorio"],
        maxLength: [25, "El titulo no puede exceder 25 caracteres"]
    },
    categoria: {
        type:String,
        required: [true, "La categoria de la publicacion no puede ir vacío"],
        maxLength: [20, "La categoria no puede exceder 20 caracteres"]
    },
    textoPrincipal: {
        type: String,
        required: [true, "El texto principal es obligatorio"],
        maxLength: [100, "El texto principal no puede exceder 100 caracteres"]
    },
    role:{
        type:String,
        required: true,
        enum: ["AUTOR_ROLE"],
        default: "AUTOR_ROLE"
    },
    keep:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Publicaciones", publicacionesSchema)