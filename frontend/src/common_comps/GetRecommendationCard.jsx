import { useState } from "react"
import { sendConnectionReq } from "../api/user"

function GetRecommendationCard({person}) {
  const [disableButton,setDisableButton]=useState(false)
  return (
    <div className="card sm:w-full md:w-96 bg-base-100 card-md shadow-sm hover:shadow-primary/30 hover:shadow-md">
                                    <div className="card-body">
                                      <div className="flex gap-2 p-2">
                                        <img src={person.profilePic} className="w-10 h-10 rounded-full object-contain"/>
                                        <div className="flex flex-col gap-1">
                                         <h1 className="text-xl font-semibold text-base-content">{person.name}</h1>
                                         <h2 className="text-sm font-light">{person.email}</h2>
                                        </div>
                                        
                                      </div>
                                      <div className=" flex flex-wrap space-x-2 p-2">
                                        <span className="text-sm font-light">Recommended by:</span>
                                        <div className="flex -space-x-4">
                                            { 
                                                person?.closeFirstFriends?.slice(0,Math.min(person.closeFirstFriends.length,10)).map((pic)=>
                                                <img src={pic} className="h-8 w-8 object-contain rounded-full" key={pic}/>)
                                            }
                                            
                                        </div>
                                      </div>
                                        <div className="justify-center w-full card-actions">
                                            <button onClick={()=>{
                                             setDisableButton((state)=>!state)
                                                sendConnectionReq(person._id)}} className="btn btn-outline w-full rounded-3xl hover:bg-primary/30 hover:text-primary" disabled={disableButton}>{disableButton?"Friend req pending...":"Send Connection"}</button>
                                        </div>
                                    </div>
                                </div>
  )
}

export default GetRecommendationCard
