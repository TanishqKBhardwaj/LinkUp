import {api} from "../lib/axios.instance.js"
import {toast} from "react-hot-toast"
import { useUserStore } from "../lib/authStore.js"
export const  googleAuth=async (codeResponse)=>{
   try {
    const code=codeResponse.code
    const {setUser}=useUserStore.getState()
    const res=await api.post("/auth/google",{code})
    const user={name:res?.data?.user?.name,
        email:res?.data?.user?.email,
        picture:res?.data?.user?.picture,
        googleId:res?.data?.user?.id
    }
    const signInResponse=await api.post("/auth/signIn",{
        name:user.name,
        email:user.email,
        profilePic:user.picture,
        googleId:user.googleId
        
    })
    if(signInResponse?.data?.success){
        user.profilePic=signInResponse?.data.user?.profilePic
        setUser(user)
    }
    toast.success("Login Successful")
   } catch (error) {
    console.log(error.response?.data?.message)
    toast.error("Unable to login at the moment:",error.response?.data?.message)
   }
}

export const LogOut=async () => {

try {
    const {logout} = useUserStore.getState();
const res=await api.post('/auth/signOut')
if(res?.data?.success)
{   logout()
    toast.success("Logout Successfully")
}

} catch (error) {
    console.log(error?.response?.data?.message)
    toast.error("Unable to logout at the moment")
}
    
}