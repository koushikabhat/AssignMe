import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Editmodal ({info}) {

  const token = localStorage.getItem('token')
  const [show, setShow] = useState(false);
 
  const [eName, seteName] = useState(info?.name)
  const [eEmail, seteEmail] = useState(info?.email)
  


  
  const handleEdit = async()=>{
    try{
      const response = await fetch(`http://localhost:3000/edit-agent`,{
        method:"POST",
        headers:{
          'Content-type':'application/json',
          Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({eName, eEmail, prevemail :info?.email})
      })

      const data = await response.json()
      if(data?.success)
      {
        alert(data?.message)
        
      }
      
      else{
        alert(data?.message)
      }

    }catch(err)
    {
      console.log("err while fetching edit agent")
    }
    finally{
      window.location.reload()
    }
   }

  const handleClose = async() =>{
    setShow(false);
    if(eName && eEmail)
    {
      handleEdit()
    } 
     
  }


  const handleShow = () =>{
    setShow(true);
  } 

  return (
    <>
      <Button variant="primary"  className="btn-bootstrap-edit" onClick={handleShow}>
        Edit
      </Button>
    
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Agnets</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter full name"
                    autoFocus
                    value={eName}
                    onChange = {(e)=>{seteName(e.target.value)}}
                />
            </Form.Group>

            {/* email  */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                value ={eEmail}
                onChange={(e)=>{seteEmail(e.target.value)}}
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

export default Editmodal;