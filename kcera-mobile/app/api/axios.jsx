import axios from "axios";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

const getHostUri = () => {
  return (
    Constants.expoConfig?.hostUri ||
    Constants.expoConfig?.extra?.expoClient?.hostUri ||
    Constants.manifest2?.extra?.expoClient?.hostUri
  );
};

const getApiClient = async () => {
  const hostUri = getHostUri();

  console.log("host URI:", hostUri);

  if (!hostUri) {
    throw new Error("Could not determine host IP. Make sure Expo is running.");
  }

  const [ip] = hostUri.split(":");
  const baseURL = `http://${ip}:8000/api/`;

  console.log("base URL:", baseURL);

  const token = await SecureStore.getItemAsync("authToken");
  console.log("token:", token);

  const api = axios.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  // Request logging
  api.interceptors.request.use(
    (request) => {
      console.log("📤 Axios Request:");
      console.log("➡️ Method:", request.method?.toUpperCase());
      console.log("➡️ URL:", request.baseURL + request.url);
      console.log("➡️ Headers:", request.headers);
      console.log("➡️ Payload:", request.data);
      return request;
    },
    (error) => {
      console.error("❌ Request Error:", error);
      return Promise.reject(error);
    }
  );

  // Response logging
  api.interceptors.response.use(
    (response) => {
      console.log("📥 Axios Response:");
      console.log("⬅️ Status:", response.status);
      console.log("⬅️ Data:", response.data);
      return response;
    },
    (error) => {
      console.error("❌ Response Error:", error.message);

      if (error.response) {
        console.error("⬅️ Status:", error.response.status);
        console.error("⬅️ Data:", error.response.data);
      } else {
        console.error("🚫 No response received (Network error?)");
      }

      return Promise.reject(error);
    }
  );

  return api;
};

export default getApiClient;
