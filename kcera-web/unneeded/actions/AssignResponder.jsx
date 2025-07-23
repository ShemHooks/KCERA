import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box
} from '@mui/material';

import { io } from "socket.io-client";

// mga table
import AssignDriver from '../Tables/AssignDriver';
import AssignRespondersStepper from '../Tables/AssignReponder';

const AssignResponder = ({ request_id }) => {
  const socket = io("http://localhost:8080");

  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDriverId, setSelectedDriverId] = useState(null); 
  const [selectedRespondersId, setSelectedRespondersId] = useState(null);

  const steps = ['Assign Driver', 'Assign Responders'];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log('Fetched Location:', lat, lng); 
          SendResponse(request_id, selectedRespondersId, selectedDriverId, lat, lng);
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Unable to fetch location.');
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
      
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
  };

  const SendResponse = async (request_id, responders_id, drivers_id, current_latitude, current_longitude) => {
    try {  
      const response = await fetch('http://127.0.0.1:8000/api/storeResponse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request_id, responders_id, drivers_id, current_latitude, current_longitude })
      });

      const result = await response.json();

      if (response.ok) {
        socket.emit('respond');
        console.log(result);

        try{
          const updateStatus = await fetch(`http://127.0.0.1:8000/api/requests/${request_id}`, {
            method:'PUT',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify({request_status : 'in_progress'})
          });

          if(updateStatus.ok){
            socket.emit('emergencyRequest')
          }
        }catch(e){
          console.log(e)
        }
      }

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Button 
        variant="contained" 
        onClick={() => {
          console.log('clicked');
          setOpen(true);
        }} 
        className="w-full">
        Respond
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Assign</DialogTitle>

        <DialogContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mt: 2 }}>
            {activeStep === 0 && (
              <AssignDriver onAssignDriver={setSelectedDriverId} />
            )}
            {activeStep === 1 && (
              <AssignRespondersStepper onAssignResponder={setSelectedRespondersId} />
            )}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button onClick={handleBack} disabled={activeStep === 0}>
              Back
            </Button>
            <Button variant="contained" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssignResponder;
