import axiosPrivateInstance from "./../../../utils/API/PrivateAxios";
import { io } from "socket.io-client";

const DeclineUsers = async (id) => {
  try {
    const socket = await io("http://127.0.0.1:8080");
    const response = await axiosPrivateInstance.post(
      `api/user/admin.only/reject/${id}`
    );

    socket.emit("updateResidents");
    socket.emit("register");
    return response.data;
  } catch (error) {
    console.log("Error approving user:", error);
    throw error;
  }
};

export default DeclineUsers;
