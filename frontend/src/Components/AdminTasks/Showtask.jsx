import React from 'react'
import { useEffect,useState } from 'react'


const Showtask = () => {
  const token = localStorage.getItem('token')

  const [tasks, settasks] = useState([])

  const fetchTasks = async()=>{
    try{
      const res = await fetch('http://localhost:3000/show-tasks',{
        method:"GET",
        headers:{
          Authorization :`Bearer ${token}`
        }
      })

      const data = await res.json()
      if(data?.success)
      {
        alert(data?.message)
        settasks(data?.aggregateTasks)
      }
      else{
        alert(data?.message)
      }
    }
    catch(err)
    {
      alert("err while fetching")
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])
  
  return (
    <div>
      <h1 className='h1-showtask'>Tasks</h1>
      <div className="container">
  
  <div>
    {tasks.length > 0 ? (
      tasks.map((task, index) => (
        <div className="agent-card" key={index}>
          <div className="agent-id">Agent ID: {task?.assignedTo}</div>
          <div className="task-list">
            {task.tasks.map((t, i) => (
              <div className="task-item" key={i}>
                <div className="task-name">Name: {t.name}</div>
                <div className="task-note">Note: {t.notes}</div>
              </div>
            ))}
          </div>
        </div>
      ))
    ) : (
      <p>No Tasks Found</p>
    )}
  </div>
</div>

    </div>
  )
}

export default Showtask
