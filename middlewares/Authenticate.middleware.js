const jwt=require("jsonwebtoken")
const authentication=(req,res,next)=>{
    const token=req.headers.authorization;
    try {
        if(token){
            const decoded= jwt.verify(token, 'notebook')
            //console.log(decoded);
            const userID=decoded.userID
                 if(decoded){
                    req.body.userID=userID
                     next();
                 }else{
                     res.send("Login First1!") 
                 }
              
         }else{
             res.send("Login First!")
         }
    } catch (error) {
        console.log(error.message);
        res.send({message:error.message})
    }
    
}

module.exports={
    authentication
}