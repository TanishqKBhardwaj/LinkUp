
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./Layout";
import toast, { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div data-theme="light">
    <Toaster/>
     
      <BrowserRouter>
        <Layout/> 
      </BrowserRouter>
    </div>
  )
}

export default App
