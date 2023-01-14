const express=require("express");
require("dotenv").config();
const {connection}=require("./config/db");
const {signupRoute}=require("./routes/User.route");
const {noteRoute}=require("./routes/Notes.route")
const {authentication}=require("./middlewares/Authenticate.middleware")
const cors=require("cors")
const app=express();
app.use(cors({
    origin:"*"
}))
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to home page!")
})

app.use("/user",signupRoute)
app.use(authentication);
app.use("/note",noteRoute)

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`server is running at port ${process.env.port}`)
})