import express from "express";
import itemModel from "../model/itemModel.js";

const router= express.Router();

router.post("/add-item",async(req,res)=>{
    try{
        const newItem= new itemModel(req.body)
        await newItem.save()
        res.send({message:"item added successfully"})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.get("/get-item",async(req,res)=>{
    try{
        const getItem= await itemModel.find()
        res.send(getItem)
    
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.post("/delete-item",async(req,res)=>{
    try{
     const items= await itemModel.findOneAndDelete({_id: req.body.itemId})
     items ? res.send("item deleted successfully") : res.status(404).send("item not found")
    }catch(err)
    {
        res.status(400).json(err)
    }
})

router.post("/update-item",async(req,res)=>{
    try{
        const items=await itemModel.findOneAndUpdate({_id:req.body.itemId},req.body)
        items ? res.send("item updated successfully") : res.status(404).send("item not found or updated")
    }
    catch(err){
        res.status(400).json(err)
    }
})

router.get("/category",async(req,res)=>{
    try{
        const items=await itemModel.find({category:req.query.category})
        items ? res.send(items) : res.status(404).send("items not found")
    }
    catch(err){
        res.status(400).json(err)
    }
})
export default router