import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import EmergencyIcon from '@mui/icons-material/Emergency';
import EmailIcon from '@mui/icons-material/Email';
import TaskCard from './card';
const BottomNav = () => {
const [value, setValue] = React.useState(1);
const [content,setContent] = React.useState('requests')

const handleChange = (e,newValue) => {
  setValue(newValue);
  if(newValue === 0){
    setContent('task')
  }else{
    setContent('updates');
};


}
  return (
    <> 
        <div className='w-full fixed bottom-0 '> 
        <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
       sx={{
        color: 'white',
        background: 'black'
        
       }}>

        <BottomNavigationAction label="Tasks" icon={< EmergencyIcon/>} />
        <BottomNavigationAction label="Updates" icon={<EmailIcon />} />
      </BottomNavigation>
      </div>
              {content === 'task' && <TaskCard/>}
              {content === 'updates' && <p>Request</p>}
            </>
  );
}
export default BottomNav;