import { Bell } from 'lucide-react'
import { useEffect, useState } from 'react'
import {getAllFriendReqs} from "../api/user.js"


function Notifications() {
    const [incomingReq,setIncomingReq]=useState([])
     const [acceptedReq,setAcceptedReq]=useState([])

     useEffect(()=>{
        try {
            (async ()=>{
                const {incoming,accepted}=await getAllFriendReqs()
                setIncomingReq(incoming)
                setAcceptedReq(accepted)
            })()
            
        } catch (error) {
            toast.error("Something happend while getting your notifications")
            console.log("Error happend at useEffect of notifications:",error)
        }
        
     },[])

  return (
    <div className=' p-2  w-full h-screen max-w-6xl mx-auto overflow-y-auto'>
    <h1 className='text-3xl font-bold'>Notifications</h1>
    
    {/*Connections request*/}
    <div className='flex flex-col  w-full mt-20'>
    <span className='font-bold  flex flex-wrap space-x-4 w-full'><Bell color={"green"}/> <span>New Connections</span></span>

    </div>

    {/*incoming Reqs*/}

    <div className='w-full flex flex-col h-1/2  overflow-y-auto rounded-md'>
    {
        incomingReq.length>0 ?(
            
                incomingReq.map((req,index)=>
                <div className={`p-2 flex w-full justify-between items-center flex-wrap ${index%2?"bg-base-100":"bg-base-300"}`} key={index}>
                    <div className=' flex space-x-2'>
                        <img src={req.sender.profilePic} className='w-10 h-10 rounded-full object-contain'/>
                        <div className='flex flex-col space-y-1'>
                        <h3>{req.sender.name}</h3>
                        <h3 className='font-light text-sm'>{req.sender.email}</h3>
                        </div>
                    
                        </div>
                    
                    <button className='btn btn-primary hover:btn-primary/30 hover:text-base-content'>Accept</button>
                    </div>
               
                )
            
        ):(
             <h2 className='mx-auto '>
                No Incoming friend requests
                </h2>
        )
    }

    </div>
      
    </div>
  )
}

export default Notifications
