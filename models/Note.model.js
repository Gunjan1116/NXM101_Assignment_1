const mongoose=require("mongoose");
mongoose.set('strictQuery', false);

const notesSchema=mongoose.Schema({
    title:{type:String,require:true},
    note:{type:String,require:true},
    category:{type:String,require:true},
    userID:{type:String,require:true}
})

const Notemodel=mongoose.model("note",notesSchema);

module.exports={
    Notemodel
}