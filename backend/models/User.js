import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    profilePic:{
        required:true,
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:""
    },
     friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User" 
    }
]
  
   
},{timestamps:true})

const User=mongoose.model("User",userSchema)
export default User