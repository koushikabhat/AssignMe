import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = ({children}) => {
  const navigate = useNavigate()
  const [isverified, setisverified] = useState(null)

  const token = localStorage.getItem('token')
  
  const verifytoken = async()=>{
    try{
      const response = await fetch('http://localhost:3000/verify-token',{
        method : "POST",
        headers:{
          Authorization :`Bearer ${token}`
        }
      });
      const data = await response.json();
      if(data?.valid)
      {
        if(data?.role === "admin")
        {
          setisverified(data?.valid)
        }
      }
      else{
        setisverified(data?.valid)
        navigate('/login')
      }
    }
    catch(err)
    {
      console.log("error in fetching the verify-token")
    }
    
  }


  useEffect(() => {
    verifytoken()
  }, [navigate])
  
  if(isverified == null)
  {
    return(<><p>Loading .........</p></>)
  }
 
  else{
    return <>{children}</>
  }
}

export default Protected
