import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Editmodal from './Editmodal';


const Showagent = () => {
   const token = localStorage.getItem('token')
   const [agentsList, setagentsList] = useState([])
   const navigate = useNavigate();

   const fetchAgent = async()=>{
    try{
        console.log("fetch is called")
        const response = await fetch('http://localhost:3000/show-agent',{
          method:"GET",
          headers:{
            'Content-type':'application/json',
            Authorization :`Bearer ${token}`
          }
        })
        // console.log("data is sent")
        const data = await response.json();
        if(data.success)
        {
          // console.log("success ")
           setagentsList(data?.existedAgent)
        
          // console.log(data?.existedAgent) 
        }
        else{
          // console.log(" error at data.success is false")
          alert(data?.message)
        }
    }
    catch(error)
    {
      alert("Error occured in the fetching agent endpoint")
    }
   }

   useEffect(() => {
     fetchAgent()
   }, [])

   const handleDelete = async(agentEmail)=>{
    try{
      const response  = await fetch(`http://localhost:3000/delete-agent/${agentEmail}`,{
        method:"DELETE",
        headers :{
          Authorization : `Bearer ${token}`
        }
      })

      const data = await response.json()
      if(data.success)
      {
        alert(data?.message)
        window.location.reload()
      }
      else{
        alert(data?.message)
      }
    }
    catch(error)
    {
      console.log(" err while fetching delete agent")
    }
   }

  return (
    <div className='container-showagent'>
      <div className="subcontainer-showagent">
        <h1>Agents List</h1>
        <div>
          {agentsList.length > 0 ? (
            agentsList.map((agent,index)=>{
              return(
                <div key={index} className="agent-card">
                  <ul>Agent Name : {agent?.agentName}</ul>
                  <ul>Agent Email : {agent?.agentEmail}</ul>
                  <Editmodal info = {{name : agent?.agentName,email:agent?.agentEmail}}/>
                  <button onClick={()=> handleDelete(agent?.agentEmail)}>Delete</button>
                </div>
              )
            })
          ): (
            <p>Empty Agents </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Showagent
