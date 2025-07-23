import React from 'react'
import { Typography } from '@mui/material'
const Header = () => {
    return (
        <div className=' bg-black flex justify-between items-center p-2 '>
            <img src="/public/images/KCERA.png" alt="KABANKALAN CITY EMERGENCY APPLICATION LOGOs" className='h-10' />
            <Typography color='white'>KCERA</Typography>
            <img src="/public/images/test2.jpg" alt="KABANKALAN CITY EMERGENCY APPLICATION LOGOs" className='h-10 rounded-full w-10' />
        </div>
    )
}
export default Header