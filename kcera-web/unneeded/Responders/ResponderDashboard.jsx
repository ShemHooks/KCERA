import React, { useState, useEffect } from "react";
import TaskCard from "./components/card";
import { io } from "socket.io-client";
import NewTaskApi from "../Drivers/services/NewTaskApi";
import ResponseDetails from "./components/ResponseDeatails";

const ResponderDashboard = () => {
  const socket = io("http://127.0.0.1:8080");
  const myId = localStorage.getItem("userID");

  const [matchedTask, setMatchedTask] = useState(null);
  const [taskDetails, setTaskDetails] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await NewTaskApi();
        const tasks = response?.newTask || [];

        const match = tasks.find(
          (task) => String(task.responders_id) === String(myId)
        );
        if (match) {
          setMatchedTask(match);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();

    socket.on("responded", () => {
      console.log("Received responded event from server");
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
    <div>
      <ResponseDetails details={taskDetails} />
      {matchedTask && <TaskCard task={matchedTask} onRespond={handleRespond} />}
    </div>
  );
};

export default ResponderDashboard;
