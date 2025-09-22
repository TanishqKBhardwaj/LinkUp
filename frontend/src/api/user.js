import {api} from "../lib/axios.instance.js"
import {toast} from "react-hot-toast"
import { useUserStore } from "../lib/authStore.js"

const user =useUserStore.getState()
export const getFriends=async () => {
 try {
    const res=await api.get("/users/friends")
    if(res?.data?.success){
        return res?.data?.firstConnections
    }
 } catch (error) {
    
    console.log(error?.response?.data?.message)
    toast.error(error?.response?.data?.message)
    return [];
    
 }  
}

export const getRecommendations=async()=>{

   try {
      console.log("I reached getRecommendations")
      const res=await api.get('/users/')
      if(res?.data?.success){
         console.log(res?.data.secondConnections)
         return res?.data.secondConnections
      }
   } catch (error) {
      console.log("Error occured at getRecommendations:",error?.response?.data?.message)
      toast.error(error?.response?.data?.message)
      return []
      
   }

}

export const sendConnectionReq=async(receiverId)=>{

   try {
      const res=await api.post(`/users/friend-req/${receiverId}`)
      if(res?.data?.success){
         toast.success(res?.data?.message)
      }
   } catch (error) {

      console.log(error?.response?.data?.message)
      toast.error(error?.response?.data?.message)
      
   }

}



export const getAllFriendReqs=async()=>{
   try {
      const res=await api.get('/users/friend-req')
      if (res?.data?.success){
         return {incoming:res?.data?.userNotifications?.incomingFriendReqs,
                 outgoing:res?.data?.userNotifications?.acceptedFriendReqs
         }
      }
   } catch (error) {

      console.log("Error happend at getAllFriendReqs APi:",error?.response?.data?.message)
      toast.error(error?.response?.data?.message)
      
   }
}


export const searchByUserInfo =async(search)=>{
   try {
      const res=await api.get("/users/searchUser",{
         params:{search}
      })
      if (res?.data?.success){
         return res?.data?.person
      }
   } catch (error) {
      console.log(error?.response?.data?.message)
      toast.error(error?.response?.data?.message)
      return null
      
   }
}