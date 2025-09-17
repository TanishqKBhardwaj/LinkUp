import { Bell, LogInIcon, LogOutIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import {useGoogleLogin} from '@react-oauth/google'
import {googleAuth,LogOut} from '../api/auth';
import {useUserStore} from "../lib/authStore";

function Navbar() {
const user = useUserStore((state) => state.user);


 const login = useGoogleLogin({
  onSuccess: codeResponse => googleAuth(codeResponse),
  onError: (errorResponse) => {
    console.error("Google login failed:", errorResponse);
    toast.error("Google login failed. Please try again.");
  },

  flow: 'auth-code',
});


  return (
    <div className='w-full h-fit  bg-base-100 shadow-lg shadow-primary/30 '>
    <div className='p-2 flex justify-end items-center gap-4'>
      <Link to="/notifications" className='cursor-pointer '> <Bell/></Link>
      {user?(
      
       <img src={user?.picture} className='h-10 w-10 rounded-full object-contain'/>
       
      ):(
        
        <button onClick={()=>login()} className='cursor-pointer'> <LogInIcon/></button>
      )}

      {user && <button onClick={()=>LogOut()} className='cursor-pointer'> <LogOutIcon/></button>}
      
      

    </div>
    </div>
  )
}

export default Navbar
