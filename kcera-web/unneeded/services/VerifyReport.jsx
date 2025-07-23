import React from "react";
import axiosInstance from "../../src/utils/API/PublicAxios";
import { io } from "socket.io-client";

const VerifyReport = async (id) => {
  console.log("id", id);
  const socket = io("http://localhost:8080");
  try {
    const response = await axiosInstance.put(`/api/requests/${id}`, {
      request_status: "in_progress",
    });

    socket.emit("emergencyRequest");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export default VerifyReport;
