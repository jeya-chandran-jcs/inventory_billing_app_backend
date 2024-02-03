import express from "express"
import billModel from "../model/billModel.js"

const router= express.Router()

router.post("/add-bill",async(req,res)=>{
    try{
       const newBill= new billModel(req.body)
       await newBill.save()
       // newBill ? res.send("bill created successfully") : res.send("bill not created")
        newBill ? res.json({ _id: newBill._id }) : res.status(500).json({ error: "Failed to create bill" });
   }catch(err){
       res.json(err)
   }
})

router.get("/get-bill",async(req,res)=>{
    try{
       const bill= await billModel.find()
     
       bill ? res.send(bill) : res.send("bill not created")
   }catch(err){
       res.json(err)
   }
})

router.get("/get-one-bill", async (req, res) => {
    try {
        const billId = req.query.billId; 
        const bill = await billModel.findById(billId);

        if (!bill) {
            return res.status(404).json({ error: "Bill not found" });
        }

        res.send(bill);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router
