import React from 'react'


const NewTaskApi = async () => {

    try{

    const response = await fetch("http://127.0.0.1:8000/api/displayAssignment");
    const taskData = await response.json();

    if(response.ok){
        return{
            newTask : taskData.data
        }
    }else{
        return{
            error: 'Cant fetch data'
        }
    }

    }catch(e){
        return{
            error: e
        }
    }

}

export default NewTaskApi
