

import { io } from "socket.io-client";

const GetEmergencyRequest = async (type, latitude, longitude, imageBlob) => {


   const socket = io("http://localhost:8080"); 
    const userId = localStorage.getItem('userID')
    // .toISOString()

    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');

    const formdata = new FormData;
    formdata.append('user_id', userId),
        formdata.append('request_type', type),
        formdata.append('request_date',formattedDate),
        formdata.append('request_status', 'pending'),
        formdata.append('longitude', longitude),
        formdata.append('latitude', latitude),  
        formdata.append("request_photo", imageBlob)

    try {
        const response = await fetch('http://127.0.0.1:8000/api/requests', {
            method: 'POST',
            body: formdata
        });
       
        const result = await response.json();
        console.log(result)
        if (response.ok) {
            
            socket.emit('emergencyRequest')
            alert('Your Request is Being Processed')
            console.log(result);
            window.location.reload();
            return {
                users: result.formdata
            }
        };

    } catch (error) {
        console.log(error, 'Something went wrong');
    };

    
};
export default GetEmergencyRequest;
