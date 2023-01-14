const express=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
require("dotenv").config();
const {Signupmodel}=require("../models/SignupModel");

const signupRoute=express.Router();

signupRoute.post("/register",async(req,res)=>{
    const {name,email,password,age}=req.body;
    try {
        const requiredData=await Signupmodel.find({email});
        if(requiredData.length>0){
            res.send("You are already register!")
        }else{
            bcrypt.hash(password, 5, async(err, hash)=> {
                // Store hash in your password DB.
                if(err){
                    console.log("err:",err)
                    res.send("Something went wrong!")
                }else{
                    const SendingData=new Signupmodel({name,email,password:hash,age});
                     await SendingData.save();
                     res.json("User register successfully!")
                }
            });
        }    
    } catch (error) {
        console.log("error:",error);
        res.json({err:error.message})
    }

})

signupRoute.post("/login",async(req,res)=>{
    const {password,email}=req.body;
    try {
        const requiredData=await Signupmodel.find({email});
        //console.log(requiredData)
        if(requiredData.length>0){
            bcrypt.compare(password, requiredData[0].password, (err, result)=> {
                if(result){
                    var token = jwt.sign({email:email,userID:requiredData[0]._id}, 'notebook');
                    res.send({"message":"Login Successfully!","token":token})
                }else{
                    res.send("Wrong Credentials")
                }
            });
            
        }else{
            res.send("Wrong Credentials")
        }
    } catch (error) {
        console.log("error:",error);
        res.json({err:error.message})
    }
})
//token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJha2VzaEBnbWFpbC5jb20iLCJpYXQiOjE2NzM0NjM0MzF9.B9VaaaTUZtQO3DPpHZYjd9vllPAXm5lq9BW3MD1LiFQ
// "name":"Nikhil",
//     "email":"nikhil@gmail.com",
//     "password":"nikhil12",
//     "age":26
module.exports={
    signupRoute
}