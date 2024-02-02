import userModel from "../model/userModel.js"
import express from "express"
import bcrypt from "bcrypt"
import  {loginUser,generateOtp} from "./helperFunctions.js"
import sendmail from "./resetEmail.js"


const router = express.Router()

router.post("/register",async(req,res)=>{
    try{
        const isUserExist= await userModel.findOne({email:req.body.email})
        if(isUserExist){
            res.send("user already exist")
            return
        }
        else{
            if(!/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*#?&]).{8,}$/g.test(req.body.password)){
                res.status(400).send({message:"password is not strong"})
                return
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser= new userModel({...req.body,password:hashedPassword,verified:true})
            console.log(newUser)
            await newUser.save()
            res.send("user created successfully")
        }
    }
    catch(err){
        console.log("error in registration",err)
        res.send("error in registration")
    }
})

router.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body
        const result=await loginUser(email,password)
        // res.send({message:"success logged in"})
        if (result.status === 200) {
            res.send({ message: "success logged in" });
        } else {
            res.status(result.status).send({ message: result.error });
        }
    }catch(err){
        console.log("error in login",err)
        res.send("error in login")
    }
})

router.post("/forget-password",async(req,res)=>{
    try{
       const {email}=req.body
       const userEmail=await userModel.findOne({email})
       if(!userEmail){
           res.send({message:"useremail not found from db"})
           return
       }
       const otp=generateOtp()
       userEmail.otp=otp
       await userEmail.save()
       
       const reset=`<p>below we provided the otp for the password reset </p>`
       const emailText=`<h1>your otp is ${otp}</h1>`
       
      
      try{
        const emailSend=await sendmail(email,reset,emailText,"reset your Password")
        res.status(200).send({message:"otp sent to your email",otp})
      }
      catch(err){
        res.status(500).send({message:"something went wrong while sending email"})
       }

    }catch(err){
        console.log("error in forget password",err)
        res.send("error in forget password")
    }
})

router.post("/reset-password",async(req,res)=>{
    try{
        const {email,password,otp}=req.body

        const user=await userModel.findOne({email})
        if(!user){
          return  res.status(404).send({message:"user email not found"})
        }
    
        if(user.otp !== otp){
            return res.status(404).send({message:"otp is not found"})
        }
    
        const hashedPassword= await bcrypt.hash(password,10)
    
        user.password=hashedPassword
        user.otp=undefined
        await user.save()
    
        res.status(200).send({message:"password reset sucess"})
    }catch(err){
        console.log("error occured in password reset")
        res.status(500).send({message:"password reset failed"})
    }  
})


export default router