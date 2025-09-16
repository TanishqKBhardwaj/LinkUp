import React from 'react'
import Navbar from './common_comps/Navbar'
import Sidebar from './common_comps/Sidebar'

function Layout({children,sideBar=true}) {
  return (
    <div data-theme="forest" className='flex w-full h-screen '>

       
         <Sidebar/>

       
       <Navbar/>
       {children}

      
    </div>
  )
}

export default Layout
