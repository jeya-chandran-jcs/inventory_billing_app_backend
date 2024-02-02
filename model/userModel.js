import mongoos from "mongoose";

const userSchema = new mongoos.Schema(
   {
    name:{type:String,required:true},
    userId:{type:String},
    email:{type:String,required:true},
    password:{type:String,required:true}, 
    verified:{type:Boolean},
    role:{type:String,required:true,default:"user",enum:["admin","user"]},
    otp:{type:String}
   },{
        timestamps:true
    }
)

const userModel = mongoos.model("user",userSchema)

export default userModel