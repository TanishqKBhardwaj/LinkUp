import React from 'react'
import {Waypoints} from "lucide-react"

function Sidebar() {
  return (
    <div className='w-64 sticky left-0 top-0 bg-base-200 border-r border-amber-300  h-full flex-col space-y-3  '>
        <h1 className=' w-full flex space-x-1 mt-3 p-2'><Waypoints size={40} /> <span className='text-primary text-3xl lg:text-5xl lavishly-yours-regular'>LinkUp</span></h1>
      
    </div>
  )
}

export default Sidebar
