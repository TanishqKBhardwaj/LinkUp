import User from "../models/User.js"
import jwt from "jsonwebtoken"
import { upsertStreamUsers } from "../lib/stream.js"
import axios from "axios";
import { uploadProfilePic } from "../lib/cloudinary.profile.upload.js"

export async function signIn(req, res) {

    try {
        const { email, name, profilePic, googleId } = req.body;

        if (!email || !name || !profilePic || !googleId)
            return res.status(400).json({ message: "User Credentials are missing", success: false });

        const cloudUrl = await uploadProfilePic(profilePic, googleId);


        const user = await User.findOneAndUpdate(
            { email },
            {
                $set: { profilePic: cloudUrl },   // always update
                $setOnInsert: {
                    name: name,
                    email: email,
                    createdAt: new Date()
                } // only on create
            },
            { new: true, upsert: true }
        );




        //Stream User upsertion
        try {
            await upsertStreamUsers({
                id: user._id,
                name: user.name,
                image: user.profilePic
            })

            console.log("Stream user upserted successfully")
        } catch (error) {
            console.error("Problem in upserting the user on Stream", error)
            return res.status(500).json({ success: false, message: "Problem in upserting user's data on stream at the moment " })
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
            success: true
        });
    } catch (error) {
        console.log("Error in signIn", error);
        return res.status(400).json({ message: "Unable to SignIn at the moment", success: false });
    }
}

export async function signOut(req, res) {
    res.clearCookie("jwt")
    return res.status(200).json({ message: "Successfully Logged out !", success: true })
}

export async function googleOAuth(req, res) {
    try {
        const { code } = req.body
        if (!code) {
            return res.status(400).json({ success: false, message: "Auth code not provided to backend" });
        }
        const client_id = process.env.GOOGLE_OAUTH_CLIENT_ID
        const client_secret = process.env.GOOGLE_OAUTH_SECRET_ID
        const redirect_uri = process.env.REDIRECT_URL

        if (!client_id || !client_secret || !redirect_uri) {
            console.log(client_id, client_secret, redirect_uri)
            return res.status(400).json({ success: false, message: "Google OAuth credentials are missing" });
        }

        const tokenRes = await axios.post(
            "https://oauth2.googleapis.com/token",
            {
                code,
                client_id,
                client_secret,
                redirect_uri,
                grant_type: "authorization_code",
                access_type: "offline"
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const { access_token, refresh_token, id_token } = tokenRes.data;

        // Step 2: Use access_token to get user info
        const userRes = await axios.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        const user = userRes.data;
        return res.status(200).json({ success: true, message: "Google Oauth successful", user });

    } catch (error) {
        console.error("Error occured at googleOAuth controller:", error.response)
        return res.status(500).json({ success: false, message: "Google Oauth unsuccessful" })
    }
}