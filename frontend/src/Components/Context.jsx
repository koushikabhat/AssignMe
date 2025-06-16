import React  from 'react'
import { createContext, useContext, useEffect } from 'react'
import { useState } from 'react';
//creating  a context instance 
export const userContext = createContext();


export  const ContextFunction = ({children}) => {

  

  //state for isLoggedin
  const [isLoggedin, setisLoggedin] = useState(false)
  const [role, setrole] = useState()
  const [userId, setuserId] = useState()

  const token = localStorage.getItem('token')


  const verifytoken = async()=>{
    if(!token)
    {
      setisLoggedin(false)
    }
    else{
      try{
        const response  = await fetch(`http://localhost:3000/verify-token`,{
          method:"POST",
          headers:{
            Authorization :`Bearer ${token}`
          }
        })
        const data = await response.json()
  
        if(data.valid)
        {
          setisLoggedin(true)
          setrole(data?.role)
          setuserId(data?.userId)
        }
        else{
          setisLoggedin(false)
        }
      }
      catch(err)
      {
        console.log("Error occured during verifytoken fetch")
      }
    }
    
  }

  useEffect(() => {
    verifytoken()
  }, [])
  
 
  
  return (
    // the value should be the object 
    <userContext.Provider value={{isLoggedin, setisLoggedin, role,}}>
        {children}
    </userContext.Provider>
  )
}


//for usage purpose 
//use const variable = useContext(userContext)
//then variable?.isLoggeedin etc




