import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";


const PendingLandingPage = () => {

 const navigate = useNavigate();

  
const backToLogin = () => {
  navigate("/")
}
  return (
    <div className=" w-full h-screen flex">
    <Card sx={{ maxWidth: 345, margin: "auto", boxShadow: 3 }}>
     
      <CardContent>
        <Typography variant="h5" component="div">
          Beloved Kabankalanon
        </Typography><br />

        <Typography variant="body2" color="text.secondary">
           Your Account is Being Verified for a Moment.
        </Typography><br />
        <Typography variant="body2" color="text.secondary">
          Try Loging in Again Later
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={backToLogin}>Back To Login</Button>
      </CardActions>
    </Card>

    </div>
  );
};

export default PendingLandingPage;
