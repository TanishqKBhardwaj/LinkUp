import {api} from "../lib/axios.instance.js"
import {toast} from "react-hot-toast"
import { useUserStore } from "../lib/authStore.js"

const user =useUserStore.getState()
export const getFriends=async () => {
   console.log("I reached getFriends")
 try {
    const res=await api.get("/users/friends")
    if(res?.data?.success){
      console.log("Friends res",res.data.firstConnections)
        return res?.data?.firstConnections
    }
 } catch (error) {
    
    console.log(error.response.message)
    toast.error(error?.response?.message)
    return [];
    
 }  
}