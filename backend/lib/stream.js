import { StreamChat } from "stream-chat";
import "dotenv/config"

const api_key=process.env.STREAM_API_KEY
const api_secret=process.env.STREAM_SECRET_KEY

if(!api_key || !api_secret)
    console.error("Stream api credentials are missing")

// instantiate your stream client using the API key and secret
// the secret is only used server side and gives you full access to the API
const serverClient = StreamChat.getInstance(
  api_key,
  api_secret,
);

export const upsertStreamUsers=async(userData)=>{
    try {
        await serverClient.upsertUsers([userData])//Create if user not exist , else update it
        return userData;
    } catch (error) {
        console.error("Error upserting Stream Users",error)
    }
}

export const generateToken=async(userId)=>{
    try {
        const token=  serverClient.createToken(userId.toString());
        return token;
    } catch (error) {
        console.error("Error generating stream token at stream function");
    }
}


