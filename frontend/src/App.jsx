
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./Layout";
import toast, { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div data-theme="light">
    <Toaster/>
     <Layout> 
      <BrowserRouter>
        <Routes>
        </Routes>
      </BrowserRouter></Layout>
    </div>
  )
}

export default App
