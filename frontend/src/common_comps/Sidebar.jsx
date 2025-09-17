import React, { useState } from 'react'
import { Bell, House, Users, Waypoints, ChevronLeft, ChevronRight } from "lucide-react"
import { NavLink } from "react-router-dom"
import { useUserStore } from '../lib/authStore'

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const user=useUserStore((state)=>state.user)

  return (
    <div 
      className={`sticky left-0 top-0 h-full bg-base-200 shadow-lg shadow-primary/30 
      flex flex-col justify-between transition-all duration-300 ease-in-out
      ${isOpen ? "w-64" : "w-20"}`}  
    >
      

      {/* Logo */}
      <h1 className="w-full flex items-center space-x-1 mt-20 p-2">
        <Waypoints size={32} />
        {isOpen && (
          <span className="text-primary text-3xl lg:text-4xl lavishly-yours-regular">
            LinkUp
          </span>
        )}
      </h1>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-primary absolute left-3 top-1 rounded-full shadow-md"
      >
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
      </button>

      {/* Nav Links */}
      <nav className="flex-col space-y-2 mt-20">
        <NavLink to="/" className={({ isActive }) =>
          `btn flex space-x-4 justify-start ${isActive ? "bg-primary/30 text-primary font-semibold" : ""}`
        }>
          <House />
          {isOpen && <span>Home</span>}
        </NavLink>

        <NavLink to="/friends" className={({ isActive }) =>
          `btn flex space-x-4 justify-start ${isActive ? "bg-primary/30 text-primary font-semibold" : ""}`
        }>
          <Users />
          {isOpen && <span>Friends</span>}
        </NavLink>

        <NavLink to="/notifications" className={({ isActive }) =>
          `btn flex space-x-4 justify-start ${isActive ? "bg-primary/30 text-primary font-semibold" : ""}`
        }>
          <Bell />
          {isOpen && <span>Notifications</span>}
        </NavLink>
      </nav>

      {/* User Section */}
      { user &&
      <div className="p-2 flex items-center space-x-4 w-full">
        <img 
          src={user?.picture}
          className="rounded-full w-12 h-12 object-contain"
          alt="User Avatar"
        />
        {isOpen && <h3 className="font-bold text-lg">{user?.name}</h3>}
      </div>
}
    </div>
  )
}

export default Sidebar
