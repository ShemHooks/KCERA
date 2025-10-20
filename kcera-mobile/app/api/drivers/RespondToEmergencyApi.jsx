import getApiClient from "../axios";
import socket from "../utility/socket";

const RespondToEmergencyApi = async (requestId, currentLocation) => {
  const payload = new FormData();
  payload.append("request_id", requestId);
  payload.append("current_latitude", currentLocation.coords.latitude);
  payload.append("current_longitude", currentLocation.coords.longitude);

  console.log("Current Location : ", currentLocation);

  try {
    const api = await getApiClient();
    const response = await api.post("emergency/response/respond", payload);

    if (response) {
      socket.emit("respond");
      socket.emit("notifyUser");

      return {
        result: response,
      };
    }
  } catch (error) {
    return;
  }
};

export default RespondToEmergencyApi;
