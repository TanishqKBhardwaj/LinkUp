
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./Layout";
import toast, { Toaster } from 'react-hot-toast';
import { useUserStore } from "./lib/authStore";
import Home from "./chat_app/Home";
function App() {
  const theme=useUserStore((state)=>state.theme)
  return (
    <div data-theme={theme}>
    <Toaster/>
     
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home/>}></Route>
          </Routes>
          </Layout> 
      </BrowserRouter>
    </div>
  )
}

export default App
