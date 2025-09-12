import jwt from "jsonwebtoken"
import User from "../models/User.js"
import "dotenv/config"

const authChecker=async(req,res,next)=>{
            try {
                const jwt_token=req.cookies.jwt;
            if(!jwt_token)
                return res.status(401).json({message:"Unauthorized , no token provided"})
            const payload=jwt.verify(jwt_token,process.env.JWT_KEY);
            if(!payload)
                return res.status(401).json({message:"Unauthorized , unable to verify token"})
            const user=await User.findById(payload.userId)
            if(!user)
                return res.status(401).json({message:"User not found with the provided jwt_token"})
            req.user=user
            next();
            } catch (error) {
                console.error("Error happend at auth middleware",error);
            }
            }

export default authChecker;            