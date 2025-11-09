import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import getApiClient from "../axios";
import ROUTES from "./../../constant/routes";
import socket from "../utility/socket";
const LoginApi = async (email, password) => {
  try {
    const api = await getApiClient();

    const response = await api.post("auth/login", {
      email,
      password,
    });

    if (response.status !== 200) {
      console.log("Login error:", response.statusText);
    }

    const user_status = response.data.data.approval;
    const token = response.data.data.token;
    const user_role = response.data.data.role;
    const user_name = response.data.data.name;

    socket.emit("userStatusUpdated");

    if (user_status === "pending") {
      router.replace(ROUTES.RESIDENTS.PENDING_USER);
      return;
    } else {
      await SecureStore.setItemAsync("authToken", token);
      await SecureStore.setItemAsync("userRole", user_role);
      await SecureStore.setItemAsync("userName", user_name);
      if (user_role === "residents") {
        router.replace(ROUTES.RESIDENTS.DASHBOARD);
      } else if (user_role === "driver") {
        router.replace(ROUTES.DRIVER.DASHBOARD);
      }
    }
  } catch (error) {
    console.log("Login failed:", error.response?.data || error.message);
  }
};

export default LoginApi;
