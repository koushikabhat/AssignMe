import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from './Context'




const Login = () => {
  const user = useContext(userContext)

  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  


  const navigate = useNavigate()

  const handleSignin = async()=>{
    navigate('/signin')
    console.log("inside login")  
  }

  const handleLogin = async()=>{
    if(email && password)
    {
      try{
        const response  = await fetch('http://localhost:3000/login',{
          method : "POST",
          headers :{
            'Content-type':'application/json'
          },
          body : JSON.stringify({email , password})
        })
        setemail('')
        setpassword('')
        
        const data = await response.json()
        if(data.success)
        {
          alert(data?.message)
          localStorage.setItem('token',data?.token)
          user?.setisLoggedin(true)
          navigate('/admin')
        }
        else{
          alert(data?.message)
        }
      }
      catch(error)
      {
        console.log("Error occured in the Login Fetch",error)
      }
    }
    else{
      alert(" enter all the Field")
    }
  }

  
  

  return (
    <>
      <div className="main-login">
        <h1 className='login-h1'>Admin Login</h1>
        <div className="main-login-box">
          <input className='input-tag' type="text"  placeholder='email' value={email} onChange={(e)=>{setemail(e.target.value)}} />
          <input className='input-tag' type="password"  placeholder='password' value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
          <button className='login-btn' onClick={()=>{handleLogin()}}>Login</button>
          <button className='login-btn' onClick={()=>{handleSignin()}}>SignIn</button>
          <p>are you  a agent </p>
          <button className='login-btn'>Agent Login</button>
        </div>
      </div>
    </>
  )
}

export default Login
