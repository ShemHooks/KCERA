import axiosPrivateInstance from "../../../utils/API/PrivateAxios";
import socket from "../../../utils/API/socket";

const DeleteLogsApi = async (id) => {
  try {
    const response = await axiosPrivateInstance.post(
      `api/logs/admin.only/delete.log${id}`
    );
    socket.emit("logsUpdate");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export default DeleteLogsApi;
