import jwt from "jsonwebtoken"
import User from "../models/User.js"
import "dotenv/config"

const authChecker=async(req,res,next)=>{
            try {
                const jwt_token=req.cookies.jwt;
            if(!jwt_token)
                return res.status(401).json({success:false,message:"Unauthorized , please relogin again"})
            const payload=jwt.verify(jwt_token,process.env.JWT_KEY);
            if(!payload)
                return res.status(401).json({success:false,message:"Unauthorized , please relogin again"})
            const user=await User.findById(payload.userId)
            if(!user)
                return res.status(401).json({success:false,message:"Please relogin again"})
            req.user=user
            next();
            } catch (error) {
                console.error("Error happend at auth middleware",error);
                 return res.status(500).json({success:false,message:"Server is not responding at the moment,please try after sometime"})
            }
            }

export default authChecker;            