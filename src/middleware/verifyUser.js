const jwt=require("jsonwebtoken")
const jwtKey = require("../auth/jwt_key")
module.exports=(req,res,next)=>{
    console.log("helooo");
    try {
        const token=req.headers.authorization.split(" ")[1];
        console.log("token",token);
        if(token){
            const decoded=jwt.decode(token,jwtKey);
            req.userData=decoded;
            next();
        }else{
            return res.status(401).json({
                message:"Auth Failed"
            }); 
        }
       
    } catch (error) {
        return res.status(401).json({
            message:"Auth Failed"
        });       
    }
}