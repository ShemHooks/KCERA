import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material';

const TaskCard = ({ task, onRespond, setHistoryId  }) => {
  const [open, setOpen] = useState(true);
 
  const requestDetails = task.alert_request;
  
  const updateResponseLocation = async (responseId) => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser.');
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
  
        try {
          const res = await fetch(`http://127.0.0.1:8000/api/updateLocation/${responseId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              latitude,
              longitude,
            }),
          });
  
          const data = await res.json();
          console.log('Location updated:', data);
        } catch (error) {
          console.error('Error updating location:', error);
        }
      },
      (error) => {
        console.error('Geolocation error:', error.message);
      }
    );
  };

  const createNewHistory = async () => {
    const response_id = task.id
    const request_id = requestDetails.id

    const response = await fetch('http://127.0.0.1:8000/api/createNewHistory', {
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
          },
          body : JSON.stringify({
            response_id,
            request_id
          })

    })

    const result = await response.json()

    if(response.ok){
       setHistoryId(result.data.id)
       
    }

  }



  const handleUpdateStatus = async ()=>{

    const id = task.id

        const response =  await fetch(`http://127.0.0.1:8000/api/updateDriverResponse/${id}`,{
            method: 'PUT',
            headers: {
                 'Content-Type': 'application/json',
                 'Accept': 'application/json'
                }
        })

        const data = await response.json();
        console.log('Status response:', data);
   
    }

  const handleClose = () => {
    onRespond(requestDetails);
    setOpen(false);
    handleUpdateStatus();
    createNewHistory();
    updateResponseLocation(task.id);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>New Task</DialogTitle>
      <DialogContent>
        <div className='flex gap-1'>
          <h1>Good Day!</h1><h1><strong>{task?.driver.name}</strong></h1>
        </div>
        <h3>You have a new task. Please respond immediately!</h3>
        <div className='flex justify-end'>
          <Button variant='contained' onClick={handleClose}>Respond</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};


export default TaskCard;
