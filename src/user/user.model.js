import { Schema, model} from "mongoose";

const userSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exced 25 characters"],
    },
    surname:{
        type: String,
        required: [true, "Surname is required"],
        maxLength: [25, "Surname cannot exced 25 characters"],
    },
    username: {
        type:String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        minLength: 8
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    profilePicture: {
        type: String,

    },
    phone: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 8
    },
    role:{
        type: String,
        required: true,
        enum: ["AUTOR_ROLE", "USER_ROLE"]
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

userSchema.methods.toJSON = function(){
    const { password, _id, ...user} = this.toObject()
    user.uid = _id
    return user
}

export default model("User", userSchema)