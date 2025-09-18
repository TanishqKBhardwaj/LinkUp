import React from 'react'
import Navbar from './common_comps/Navbar'
import Sidebar from './common_comps/Sidebar'

function Layout({children}) {
  return (
    <div  className='flex w-full h-screen '>

       
         <Sidebar/>

       <div className='flex flex-col gap-2 w-full'>
            <Navbar/>
       {children}
       </div>
      

      
    </div>
  )
}

export default Layout
