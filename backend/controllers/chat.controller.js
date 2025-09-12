import { generateToken } from "../lib/stream.js"

export const getStreamToken=async(req,res)=>{
   try {
     const userId=req.user._id

    const token=generateToken(userId)
    return res.status(200).json({success:true,message:"Successfuly generated stream token",token})
   } catch (error) {
    console.error("Error occured at stream controller",error)
    return res.status(500).json({success:false,message:"Unable to generate stream token at the moment"});
   }

}