import User from "../models/User.js"
import jwt from "jsonwebtoken"
import {upsertStreamUsers} from "../lib/stream.js"

export async function signIn(req, res) {
    const { email, name, profilePic } = req.body;
    try {
        if (!email || !name || !profilePic)
            return res.status(400).json({ message: "User Credentials are missing",success:false });
        let user =  await User.findOne({ email: email });
        if (!user) {
            user = await User.create({
                name, email, profilePic
            });
        }
       

        //Stream User upsertion
        try {
            await upsertStreamUsers({
                id:user._id,
                name:user.name,
                image:user.profilePic
            })

            console.log("Stream user upserted successfully")
        } catch (error) {
            console.error("Problem in upserting the user on Stream",error)
            return res.status(500).json({success:false,message:"Problem in upserting user's data on stream at the moment "})
        }

        const jwt_token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_KEY, { expiresIn: '24h' })

        res.cookie("jwt", jwt_token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true, //Xss attacks
            sameSite: "strict", //CSRF atttacks
            secure: process.env.NODE_ENV === "production" //HTTPS works in production mode
        })
        return res.status(200).json({
            message: "Successfully SignedIn", user: {
                id: user._id,
                email: user.email,
                name: user.name,
                profilePic: user.profilePic
            },
            token: jwt_token,
            success:true
        });
    } catch (error) {
        console.log("Error in signIn", error);
        return res.status(400).json({ message: "Unable to SignIn at the moment",success:false });
    }
}  

export async function signOut(req,res){
    res.clearCookie("jwt")
    return res.status(200).json({message:"Successfully Logged out !",success:true})
}