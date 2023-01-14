const mongoose=require("mongoose");
mongoose.set('strictQuery', false)
const signupSchema=mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    age:{type:Number,require:true}
})

const Signupmodel=mongoose.model("user",signupSchema);

module.exports={
    Signupmodel
}