import React from 'react'
import { Button } from '@mui/material';
const TaskInfo = () => {
    return (
        <div className='shadow-lg h-full max-w-full p-2 flex flex-col gap-2 m-2 rounded-2xl'>
            <div>
                <h1 className='text-center font-bold tracking-wider'>Details</h1>
            </div>
            
            <img src="/public/images/test2.jpg" alt="" className='rounded-lg' />
            <div className='flex flex-col gap-2 '>
                <p >Request Id: <strong>01</strong></p>
                <p>Response Id: <strong>02</strong></p>
                <p>Response Time: <strong>10:30 a.m</strong></p>
            </div>
            <div className='flex justify-end'>
                <Button variant='contained' className='!w-40' >view</Button>
            </div>
        </div>
    )
}

export default TaskInfo;