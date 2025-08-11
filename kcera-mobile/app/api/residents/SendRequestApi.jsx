import getApiClient from "../axios";
import socket from "../utility/socket";

const SendRequestApi = async (pinnedLocation, requestType, requestPhoto) => {
  const requestImage = {
    uri: requestPhoto.uri.startsWith("file://")
      ? requestPhoto.uri
      : `file://${requestPhoto.uri}`,
    type: requestPhoto.type || "image/jpeg",
    name: requestPhoto.fileName || "photo.jpg",
  };

  const imageUri = requestPhoto.uri;

  console.log("image uri", imageUri);

  const formData = new FormData();
  formData.append("request_type", requestType);
  formData.append("latitude", pinnedLocation.latitude);
  formData.append("longitude", pinnedLocation.longitude);
  formData.append("request_photo", requestImage);

  formData._parts.forEach(([key, value]) => {
    console.log(`${key}:`, value);
  });

  try {
    const api = await getApiClient();
    const response = await api.post("emergency/submit", formData);

    socket.emit("emergencyRequest");
    return {
      success: response,
    };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 409) {
        return {
          success: error,
        };
      } else {
        return;
      }
    } else {
      return;
    }
  }
};

export default SendRequestApi;
