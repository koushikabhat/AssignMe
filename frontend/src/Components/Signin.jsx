import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signin = () => {

    const [userName, setuserName] = useState()
    const [email, setemail] = useState()
    const [password, setpassword] = useState()

    const navigate = useNavigate()

    const handleSignin = async()=>{
        if(userName && email && password)
        {
        
            try
            {
                const response = await fetch('http://localhost:3000/signin',{
                    method : "POST",
                    headers:{
                    'Content-type' : 'application/json'
                    },
                    body : JSON.stringify({userName,email, password})
                })
                setemail('')
                setuserName('')
                setpassword('')
                console.log("after fetch")

                const data  = await response.json()

                if(data.success)
                {
                    alert(data?.message)
                    navigate('/login')
                }
                else{
                    alert(data?.message)
                }

            }
            catch(error)
            {

                console.log("error occured during sigin fetch",error)
                alert("erro in sigin fetch")
            }
        }
        else{
        alert("Enter All the Fields")
        }
     
    }

    const handleLoginClick = ()=>{
        navigate('/login')
    }
  return (
    
    <div className='container'>
       <div className="main-login">
        <h1 className='login-h1'>Admin Sigin</h1>
      <div className="main-login-box">
        <input className='input-tag' type="text"  placeholder='name' value={userName} onChange={(e)=>{setuserName(e.target.value)}} />
        <input className='input-tag' type="text"  placeholder='email' value={email} onChange={(e)=>{setemail(e.target.value)}} />
        <input className='input-tag' type="password"  placeholder='password' value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
        <button className='login-btn' onClick={()=>{handleSignin()}}>SignIn</button>
        {/* <p>already have an account</p> */}
        <button className='login-btn' onClick={()=>{handleLoginClick()}}>Login</button>
        <p>are you  a agent </p>
        <button className='login-btn'>Agent Login</button>
      </div>
      </div>
      
    </div>
  )
}

export default Signin
