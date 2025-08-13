import axiosPrivateInstance from "./../../../utils/API/PrivateAxios";
import socket from "../../../utils/API/socket";

const VerifyEmergencyApi = async (id) => {
  try {
    const response = await axiosPrivateInstance.post(
      `api/emergency/admin.only/verify/${id}`
    );
    socket.emit("emergencyRequest");
    return {
      response: response,
    };
  } catch (error) {
    console.log(error);
  }
};

export default VerifyEmergencyApi;
