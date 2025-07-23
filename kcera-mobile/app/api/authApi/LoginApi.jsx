import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import getApiClient from "../axios";
import ROUTES from "./../../constant/routes";
const LoginApi = async (email, password) => {
  try {
    const ip = getApiClient();

    const response = await ip.post(
      "auth/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      console.log("Login error:", response.statusText);
    }

    const userStatus = response.data.data.approval;
    const token = response.data.data.token;
    const userRole = response.data.data.role;

    if (userStatus === "pending") {
      router.replace(ROUTES.RESIDENTS.PENDING_USER);
      return;
    } else {
      await SecureStore.setItemAsync("authToken", token);
      if (userRole === "residents") {
        router.replace(ROUTES.RESIDENTS.DASHBOARD);
      }
    }
  } catch (error) {
    console.log("Login failed:", error.response?.data || error.message);
  }
};

export default LoginApi;
