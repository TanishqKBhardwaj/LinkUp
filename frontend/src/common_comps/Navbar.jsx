import { Bell, LogInIcon, LogOutIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

function Navbar() {
 const isAuthenticated=false
  return (
    <div className='w-full h-fit  bg-base-100 shadow-lg shadow-primary/30 '>
    <div className='p-2 flex justify-end gap-4'>
      <Link to="/notifications" className='cursor-pointer'> <Bell/></Link>
      {isAuthenticated?(
      
       <img src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" className='h-10 w-10 rounded-full object-contain'/>
       
      ):(
        
        <Link to="/login" className='cursor-pointer'> <LogInIcon/></Link>
      )}

      {isAuthenticated && <Link to="/logout" className='cursor-pointer'> <LogOutIcon/></Link>}
      
      

    </div>
    </div>
  )
}

export default Navbar
