import React from "react";
import axiosInstance from "../../src/utils/API/PublicAxios";
import { io } from "socket.io-client";

const RejectReport = async (id) => {
  const socket = io("http://localhost:8080");
  try {
    const response = await axiosInstance.put(`/api/requests/${id}`, {
      request_status: "rejected",
    });

    socket.emit("emergencyRequest");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export default RejectReport;
