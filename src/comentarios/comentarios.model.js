import { Schema, model, version } from "mongoose";

const comentarioSchema = Schema({
    opiniones:{
        type:String,
        required: [true, "La opinion es requerida"],
        maxLength: [200, "La opinion no puede pasar los caracteres"]
    },
    informacion:{
        type:String,
        required: [true, "La informacion es requerida"],
        maxLength: [200, "La informacion no puede ir vacía"]
    },
    role:{
        type: String,
        required: true,
        enum: ["AUTOR_ROLE"],
        default: "AUTOR_ROLE"
    },
    keeper: {
        type: Schema.Types.ObjectId,
        ref: "Publicaciones",
        required: true
    },
    status:{
        type:Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Comentarios", comentarioSchema)