import React from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from './pages/navbar';
import toast, { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
    <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route exact path="/navbar" element={<Navbar />} />
        </Routes>
      </BrowserRouter>
      <button className="btn btn-accent" onClick={()=>toast.success("I am successfuly installed")}>Accent</button>
    </>
  )
}

export default App
