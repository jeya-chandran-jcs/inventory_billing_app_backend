import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";

const loginUser=async (email,password)=>{
    try{
        const user=await userModel.findOne({email})
        if(!user ){
            return { error: "user not found", status: 404 };
        }
        
        const storedPassword= user.password
        if(!storedPassword){
            return { error: "Password not found", status: 500 };
        }
        
        const isMatch=await bcrypt.compare(password,storedPassword)
        console.log("Password:", password);
        console.log("Stored Password:", storedPassword);
        console.log("Is Match:", isMatch);
        if (isMatch) {
          
            return { user, status: 200 };
          } 
        else {
           
            return { error: "Invalid credentials password", status: 401 };
          }
    }
    catch(err){
        console.log(err)
        throw err
    }
}

const generateOtp=()=>{
    return Math.floor(100000 + Math.random() * 900000)
}

export {loginUser,generateOtp}