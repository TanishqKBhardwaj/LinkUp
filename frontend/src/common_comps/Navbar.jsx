import { Bell, LogInIcon, LogOutIcon, Palette } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import { googleAuth, LogOut } from '../api/auth';
import { useUserStore } from "../lib/authStore";
import { THEMES } from "../constants/constants.js"

function Navbar() {
  const {user,setTheme,theme:orgTheme} = useUserStore((state) => state);


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

        {/*Dropdown*/}
        <div className='dropdown dropdown-end '>
          <button className='btn '><Palette /></button>
          <div className='menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm h-60 flex flex-col gap-3 flex-nowrap  overflow-y-auto'>
            {
              THEMES.map((theme) =>
                <button className={`flex gap-2 justify-between items-center w-full cursor-pointer rounded-md h-10 p-2 ${theme.name===orgTheme?"bg-primary/30 text-primary":""} `} key={theme.label} onClick={()=>setTheme(theme.name)}>
                    <span><Palette/></span>
                     <span>{theme.label}</span>
                  <div className='flex gap-1'>
                    {
                      theme.colors.map((color) =>
                        <span
                          key={color+Math.random()*100}
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: color }}
                        ></span>
                      )
                    }

                  </div>
                  
                 

                </button>
              )
            }

          </div>

        </div>

        {/*Links*/}
        <Link to="/notifications" className='cursor-pointer '> <Bell /></Link>
        {user ? (

          <img src={user?.picture} className='h-10 w-10 rounded-full object-contain' />

        ) : (

          <button onClick={() => login()} className='cursor-pointer'> <LogInIcon /></button>
        )}

        {user && <button onClick={() => LogOut()} className='cursor-pointer'> <LogOutIcon /></button>}



      </div>
    </div>
  )
}

export default Navbar
