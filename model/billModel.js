import mongoose from "mongoose"

const billSchema=mongoose.Schema(
    {
        customerName:{type:String,required:true},
        customerPhone:{type:Number,required:true},
        totalAmount:{type:Number,required:true},
        tax:{type:Number,required:true},
        subTotal:{type:Number,required:true},
        paymentMode:{type:String,required:true},
        cartItems:{type:Array,required:true},
        role:{type:String,required:true,default:"user",enum:["user","admin"]},
    },{
        timestamps:true
    }
    )

const billModel=mongoose.model("bill",billSchema)

export default billModel