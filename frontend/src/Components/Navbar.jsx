import React, { useEffect } from 'react';
import '../../src/index.css';
import { useState } from 'react';
import { useContext } from 'react';
import { userContext } from './Context';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

  const user = useContext(userContext)
  const navigate =useNavigate();
  const token = localStorage.getItem('token')

  const handleHome = ()=>{
    navigate('/')
  }
  const handleloginclick = ()=>{
    console.log("handle login clicked")
    navigate('/login')
  }
  const handlelogout = ()=>{
    if(token)
    {
      localStorage.removeItem('token')
      navigate('/')
      user?.setisLoggedin(false)
    }
  }

 
  
  return (
    <div className="main-div">
      <ul className="nav-ul">
        <li className="nav-logo">MyApp</li>
        <div className="nav-links">
          <li onClick={()=>{handleHome()}}>Home</li>
          {user?.isLoggedin ? (<li onClick={()=>{handlelogout()}}>LogOut</li>):(<li onClick={()=>{handleloginclick()}}>LogIN</li>)}
          <li>About</li>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;

