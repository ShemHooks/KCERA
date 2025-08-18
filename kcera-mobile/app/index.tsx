import ROUTES from "./constant/routes";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { router } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import "../app/api/utility/socket";

export default function Index() {
  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync("authToken");
      const user_role = await SecureStore.getItemAsync("userRole");
      if (token) {
        if (user_role === "residents") {
          router.replace(
            ROUTES.RESIDENTS.DASHBOARD as "/screens/residents/Dashboard"
          );
        } else if (user_role === "driver") {
          router.replace(
            ROUTES.DRIVER.DASHBOARD as "/screens/drivers/Dashboard"
          );
        } else {
          router.replace(ROUTES.AUTH.LOGIN as "/screens/auth/HomeScreen");
        }
      } else {
        router.replace(ROUTES.AUTH.LOGIN as "/screens/auth/HomeScreen");
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
