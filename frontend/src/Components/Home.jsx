import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const handleLogin  = ()=>{
    console.log("Login is clicked")
    navigate('/login')
  }
  return (
    <>
    <div className='home-main-div'>
      <div className="home-sub-div">
        <h1 className='home-h1'>Welcom to this is a Home Page </h1>
        <p>lets asiign the task and add agent</p> 
      </div>
    <button className='home-button' onClick={()=>{handleLogin()}}>Login</button>
    </div>
    </>
  )
}

export default Home
