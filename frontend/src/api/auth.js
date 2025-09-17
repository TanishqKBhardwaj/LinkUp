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
        picture:res?.data?.user?.picture
    }
    setUser(user)
    const signInResponse=await api.post("/auth/signIn",{
        name:user.name,
        email:user.email,
        profilePic:user.picture
    })
    if(signInResponse?.data?.success)
    toast.success("Login Successful")
   } catch (error) {
    console.log(error.response?.data?.message)
    toast.error("Unable to login at the moment")
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