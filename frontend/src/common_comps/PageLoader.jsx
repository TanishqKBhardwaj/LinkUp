import React from 'react'
import {Loader} from "lucide-react"

function PageLoader() {
  return (
    <div data-theme="dark" className='h-screen flex justify-center items-center '>
      <Loader className='animate-spin ' color='green' size={64} />
    </div>
  )
}

export default PageLoader
