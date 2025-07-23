import React from 'react'

const GetReport = async () => {
    try{
        const response = await fetch('http://127.0.0.1:8000/api/retrieveReport');
        const data = await response.json();

        console.log('from api', data)
            
        if(response.ok){
            return {
                reports: data.data
            }
        } else {
            return {
                error: 'Unable to fetch data.'    
            }
        }        
    }catch(e){
        console.log(e)
    }
}

export default GetReport
