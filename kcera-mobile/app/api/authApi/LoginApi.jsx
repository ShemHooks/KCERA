import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import getApiClient from "../axios";
import ROUTES from "./../../constant/routes";
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

    if (user_status === "pending") {
      router.replace(ROUTES.RESIDENTS.PENDING_USER);
      return;
    } else {
      await SecureStore.setItemAsync("authToken", token);
      await SecureStore.setItemAsync("userRole", user_role);
      if (user_role === "residents") {
        router.replace(ROUTES.RESIDENTS.DASHBOARD);
      }
    }
  } catch (error) {
    console.log("Login failed:", error.response?.data || error.message);
  }
};

export default LoginApi;
