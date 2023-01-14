const express=require("express");
const {Notemodel}=require("../models/Note.model");

const noteRoute=express.Router();

noteRoute.post("/create",async(req,res)=>{
    const data=req.body;
    try {
        const addData=new Notemodel(data);
        await addData.save()
        res.send("note created successfully!")
    } catch (error) {
        console.log("error:",error);
        res.json({err:error.message})
    }
})

noteRoute.get("/",async(req,res)=>{
    try {
        const requireData=await Notemodel.find();
        res.json(requireData);
    } catch (error) {
        console.log("error:",error);
        res.json({err:error.message})
    }
})

noteRoute.patch("/update/:id",async(req,res)=>{
    const ID=req.params.id;
    const data=req.body;
    const note=await Notemodel.findOne({_id:ID});
    const userID_in_note=note.userID;
    const userID_making_request=req.body.userID;
    try {
        if(userID_making_request!==userID_in_note){
            res.json({"msg":"you are not authorized!"});
        }else{
            await Notemodel.findByIdAndUpdate({_id:ID},data);
            res.send(`Data of id ${ID} was updated successfully`);
        }
        
    } catch (error) {
        console.log("error:",error);
        res.json({err:error.message})
    }
})

noteRoute.delete("/remove/:id",async(req,res)=>{
    const ID=req.params.id;
    const data=req.body;
    const note=await Notemodel.findOne({_id:ID});
    const userID_in_note=note.userID;
    const userID_making_request=req.body.userID;
    try {
        if(userID_making_request!==userID_in_note){
            res.json({"msg":"you are not authorized!"});
        }else{
            await Notemodel.findByIdAndDelete({_id:ID});
            res.send(`Data of id ${ID} was deleted successfully`)
        }
        
    } catch (error) {
        console.log("error:",error);
        res.json({err:error.message})
    }
})
// "title": "Binary search",
// "note": "it is a searching algorithm",
// "category": "DSA",
// "author": "Ankush",
module.exports={
    noteRoute
}