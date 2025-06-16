import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Agentmodal () {

  const token = localStorage.getItem('token')
  const [show, setShow] = useState(false);
  const [agentName, setagentName] = useState()
  const [agentEmail, setagentEmail] = useState()
  const [agentPassword, setagentPassword] = useState()


  const handleClose = async() =>{
    setShow(false);
    if(agentEmail && agentName && agentPassword)
    {
        try{
            const response = await fetch('http://localhost:3000/add-agent',{
                method :"POST",
                headers:{
                    'Content-type':'application/json',
                    Authorization:`Bearer ${token}`
                },
                body:JSON.stringify({agentName, agentEmail, agentPassword})
            })
            setagentEmail('')
            setagentName('')
            setagentPassword('')
            const data = await response.json()
            if(data.success)
            {
                alert(data?.message)
            }
            else{
                alert(data?.message)
            }
        }
        catch(error)
        {
            console.log("error while fetching the add-agent")
        }
    }
    
  }
  const handleShow = () =>{
    setShow(true);
  } 

  return (
    <>
      <Button variant="primary"  className="btn-bootstrap" onClick={handleShow}>
        Add Agent
      </Button>
    
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Agnets</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter full name"
                    autoFocus
                    value={agentName}
                    onChange = {(e)=>{setagentName(e.target.value)}}
                />
            </Form.Group>

            {/* email  */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                value ={agentEmail}
                onChange={(e)=>{setagentEmail(e.target.value)}}
              />
            </Form.Group>

            {/* password */}
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value ={agentPassword}
                onChange = {(e)=>{setagentPassword(e.target.value)}}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{handleClose()}}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{handleClose()}}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Agentmodal;