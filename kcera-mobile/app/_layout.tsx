import { Stack } from "expo-router";
import "../global.css";

import ResidentsTab from "./navigation/ResidentsTab";
import ROUTES from "./constant/routes";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
