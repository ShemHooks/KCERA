import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { lazy, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = lazy(() => import("../../components/Residents/HomeScreen"));
const MapView = lazy(() => import("../../components/Residents/MapView"));
const NotificationScreen = lazy(() =>
  import("../../components/Residents/NotificationScreen")
);
const ProfileSetting = lazy(() =>
  import("../../components/Residents/ResidentProfile")
);

const Dashboard = () => {
  const [screen, setScreen] = useState("Home");

  const renderScreen = () => {
    switch (screen) {
      case "Home":
        return <HomeScreen />;
      case "Map":
        return <MapView />;
      case "Notification":
        return <NotificationScreen />;
      case "Settings":
        return <ProfileSetting />;

      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>

      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => setScreen("Home")}
          className="flex flex-col items-center justify-center"
        >
          <Ionicons name="home-outline" size={24} color="#333" />
          <Text>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setScreen("Map")}
          className="flex flex-col items-center justify-center"
        >
          <Ionicons name="map-outline" size={24} color="#333" />
          <Text>Map</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setScreen("Notification")}
          className="flex flex-col items-center justify-center"
        >
          <Ionicons name="notifications-outline" size={24} color="#333" />
          <Text>Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setScreen("Settings")}
          className="flex flex-col items-center justify-center"
        >
          <Ionicons name="person-outline" size={24} color="#333" />
          <Text>Profie</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: "center", alignItems: "center" },
  screen: { fontSize: 24 },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#ddd",
  },
  navItem: { fontSize: 18 },
});
