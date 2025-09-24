import getApiClient from "./../axios";
import { router } from "expo-router";
import ROUTES from "./../../constant/routes";
import * as SecureStore from "expo-secure-store";
import socket from "../utility/socket";

const LogoutApi = async () => {
  try {
    const ip = await getApiClient();
    const response = await ip.post("user/logout");

    if (response.status === 200) {
      socket.emit("userStatusUpdated");
      await SecureStore.deleteItemAsync("authToken");
      router.replace(ROUTES.AUTH.LOGIN);
    }
  } catch (e) {
    console.log(e);
  }
};

export default LogoutApi;
