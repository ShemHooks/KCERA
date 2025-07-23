import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import EmergencyIcon from '@mui/icons-material/Emergency';
import EmailIcon from '@mui/icons-material/Email';
// import TaskCard from './card';
import TaskInfo from './taskInfo';
const BottomNav = () => {
    const [value, setValue] = React.useState(1);

    const handleChange = (e, newValue) => {
        setValue(newValue);
    }
    return (
        <>
            <div className='w-full fixed bottom-0 '>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={handleChange}
                    sx={{
                        background: 'black'
                    }}
                    className='!rounded-2xl m-4'>
                    <BottomNavigationAction label="Tasks" icon={< EmergencyIcon />} sx={{
                        color: 'white',
                        '&.Mui-selected': {
                            color: 'skyblue'
                        }

                    }} />
                    <BottomNavigationAction label="Updates" icon={<EmailIcon />} sx={{
                        color: 'white',
                        '&.Mui-selected': {
                            color: 'skyblue'
                        }

                    }} />
                </BottomNavigation>
            </div>
            {value === 0 && <TaskInfo />}
            {value === 1 && <p>Request</p>}
        </>
    );
}
export default BottomNav;