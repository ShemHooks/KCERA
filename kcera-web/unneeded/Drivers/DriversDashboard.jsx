import React, { useState, useEffect } from 'react';
import DriversHeader from './components/header';
import NewTaskApi from './services/NewTaskApi';
import TaskCard from './components/card';
import { io } from 'socket.io-client';
import EmergencyDetails from './components/EmergencyDetails';

const DriversDashboard = () => {
  const socket = io("http://127.0.0.1:8080");
  const myId = localStorage.getItem('userID');
  const [matchedTask, setMatchedTask] = useState(null);
  const [taskDetails, setTaskDetails] = useState(null);
  const [historyId, setHistoryId] = useState(null);



  const [from, setFrom] = useState([])

  useEffect(() => {

    const fetchTasks = async () => {
      try {
        const response = await NewTaskApi();
        const tasks = response?.newTask || [];
        const match = tasks.find(task => String(task.drivers_id) === String(myId));
        if (match) {
          setMatchedTask(match);

          setFrom([match.current_latitude, match.current_longitude])

        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();

    socket.on('responded', () => {
      console.log('Received responded event from server');
      fetchTasks();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleRespond = (details) => {
    setTaskDetails(details);
  };

  return (
    <div className='overflow-scroll'>
      <DriversHeader />
      <div className='w-full h-screen flex items-center justify-center border '>
        <EmergencyDetails details={taskDetails} from={from} historyId={historyId}/>
      </div>
      {matchedTask && <TaskCard task={matchedTask} onRespond={handleRespond} setHistoryId={setHistoryId} />}
    </div>
  );
};

export default DriversDashboard;
