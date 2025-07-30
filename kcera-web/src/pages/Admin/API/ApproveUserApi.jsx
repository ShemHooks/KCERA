import React from "react";
import axiosPrivateInstance from "./../../../utils/API/PrivateAxios";
import { io } from "socket.io-client";

const ApproveUserApi = async (id, handleGetPendingUsers) => {
  const socket = io("http://127.0.0.1:8080");

  try {
    const response = await axiosPrivateInstance.post(
      `api/user/admin.only/approve/${id}`
    );

    socket.emit("updateResidents");
    handleGetPendingUsers();
    return response.data;
  } catch (error) {
    console.log("Error approving user:", error);
    throw error;
  }
};

export default ApproveUserApi;
