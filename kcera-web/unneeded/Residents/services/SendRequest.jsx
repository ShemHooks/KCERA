import React from "react";
import axiosInstance from "../../../src/utils/API/Axios";
import { io } from "socket.io-client";

const base64ToFile = (base64Data, filename) => {
  const arr = base64Data.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

const SendRequest = async (
  user_id,
  request_type,
  request_status,
  request_date,
  longitude,
  latitude,
  request_photo
) => {
  const socket = io("http://localhost:8080");
  const imageFile = base64ToFile(request_photo, "photo.png");

  console.log("date", request_date);

  const formData = new FormData();
  formData.append("user_id", user_id);
  formData.append("request_type", request_type);
  formData.append("request_status", request_status);
  formData.append("request_date", request_date);
  formData.append("longitude", longitude);
  formData.append("latitude", latitude);
  formData.append("request_photo", imageFile);

  try {
    const response = await axiosInstance.post("api/requests", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (!response) {
      console.log("unable to send");
    }

    socket.emit("emergencyRequest");
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Something went wrong. Please try again.";

    throw new Error(message);
  }
};

export default SendRequest;
