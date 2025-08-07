import { router } from "expo-router";
import ROUTES from "../../constant/routes";
import getApiClient from "../axios";
import socket from "../utility/socket";

const RegistrationApi = async (formData) => {
  try {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("address", formData.address);
    data.append("phone", formData.phone);
    data.append("gender", formData.gender);

    data.append("front_id_photo", {
      uri: formData.frontImage,
      name: "front.jpg",
      type: "image/jpeg",
    });
    data.append("back_id_photo", {
      uri: formData.backImage,
      name: "back.jpg",
      type: "image/jpeg",
    });
    data.append("face_photo", {
      uri: formData.facePhoto,
      name: "face.jpg",
      type: "image/jpeg",
    });

    const ip = getApiClient();

    const response = await ip.post("auth/register", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response.status === 200) {
      return { true: false };
    }
    socket.emit("register");
    router.replace(ROUTES.RESIDENTS.PENDING_USER);
  } catch (error) {
    if (error.response) {
      console.log("Server responded with:", error.response.data);
    } else {
      console.error("Other error:", error.message);
    }
    throw error;
  }
};

export default RegistrationApi;
