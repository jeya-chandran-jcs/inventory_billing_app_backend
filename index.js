import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import userRouter from "./userRoutes/register.js"
import itemRouter from "./routes/itemRoutes.js"
import billRouter from "./routes/billRoutes.js"

const app = express();
app.use(express.json());


dotenv.config();
app.use(cors())
const Port=process.env.PORT 
const MongoURL=process.env.Mongo_Url

app.get("/",(req,res)=>{
    res.send("hello")
})

app.use("/user",userRouter)
app.use("/product",itemRouter)
app.use("/bill",billRouter)

mongoose.connect(MongoURL)
.then(()=>{
    app.listen(Port,()=>{ console.log(`server is running on port ${Port}`) })
})
.catch(err=>{ console.log(err) })
