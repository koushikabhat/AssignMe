import React, { useRef } from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Agentmodal from './AdminTasks/Agentmodal';
import { useNavigate } from 'react-router-dom';


const Admindashboard = () => {

  const [csv, setcsv] = useState(null)
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const token = localStorage.getItem('token')

  const handleViewAgent = async()=>{
    navigate('/admin/showagent')
  }

  const handleClickUpload= ()=>{
    fileInputRef.current.click()
  }

  const handleCsv= async()=>{
    if(!csv)
    {
      alert("select Csv File")
      return
    }
    else{
      const formData = new FormData()
      formData.append('csvfile',csv)

      try{
        const response = await fetch('http://localhost:3000/upload-csv',{
          method:"POST",
          headers:{
            Authorization :`Bearer ${token}`
          },
          body :formData
        })
        const data = await response.json()

        if(data.success)
        {
          alert(data?.message)
        }
        else{
          alert(data?.message)
        }
      }
      catch(err)
      {
        alert("error while fetching csv")
      }
    }
  }

  const handleClickViewTask = ()=>{
    navigate('/admin/showtask')
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <h4>Welcome Admin</h4>
        <p>You can add agents, upload task CSVs, and view assigned tasks below.</p>
      </header>


      <div className="admin-actions">
        {/* <button className="admin-button">Add Agent</button> */}
        <Agentmodal/>
        <button className="admin-button" onClick={()=>{handleViewAgent()}}>View-Agent</button>
        <button className="admin-button" onClick={()=>{handleClickUpload()}}>Upload CSV</button>
        <button className="admin-button" onClick={()=>{handleClickViewTask()}}>View Tasks</button>
      </div>
      
      <input
          type="file"
          accept=".csv"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e)=>{setcsv(e.target.files[0]); handleCsv()}}
        />
    </div>
  );
};

export default Admindashboard;

