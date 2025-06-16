import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Components/Home"
import Login from "./Components/Login"
import Navbar from "./Components/Navbar"
import Admindashboard from "./Components/Admindashboard"
import Protected from "./Components/Protected"
import { ContextFunction } from "./Components/Context"
import Signin from "./Components/Signin"
import 'bootstrap/dist/css/bootstrap.min.css';
import Showagent from "./Components/AdminTasks/Showagent"
import Showtask from "./Components/AdminTasks/Showtask"
import AdminLayout from "./Components/AdminLayout"

function App() {
  

  return (
    <>
      <ContextFunction>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element ={<Home/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/login" element={<Login/>}/>

            {/* nested Routes  */}
            <Route path="/admin" element={<Protected> <AdminLayout/></Protected>}>
                <Route index element={<Admindashboard />} />
                <Route path="showagent" element={<Showagent />} />
                <Route path="showtask" element={<Showtask />} />
            </Route>
          </Routes>
        </Router>
      </ContextFunction>
      
    </>
  )
}

export default App

{/* <Route path="/admin/showagent" element = {
              <Protected>
                <Showagent/>
              </Protected>
            }/> */}
