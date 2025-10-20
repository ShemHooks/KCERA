import axiosPrivateInstance from "../../../utils/API/PrivateAxios";
import socket from "../../../utils/API/socket";

const RejectEmergencyApi = async (id) => {
  console.log("click", id);
  try {
    const response = await axiosPrivateInstance.post(
      `api/emergency/admin.only/reject/${id}`
    );
    socket.emit("emergencyRequest");
    socket.emit("notifyUser");
    return {
      response: response,
    };
  } catch (error) {
    console.log(error);
  }
};

export default RejectEmergencyApi;
