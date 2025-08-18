import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { lazy, Suspense } from "react";

// Lazy imports
const Home = lazy(() => import("../../components/drivers/HomeScreen"));
const NotificationScreen = lazy(() =>
  import("../../components/Residents/NotificationScreen")
);
const ProfileSetting = lazy(() =>
  import("../../components/Residents/ResidentProfile")
);
const ReportEmergency = lazy(() =>
  import("../../components/Residents/ReportEmergency")
);

const Loading = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator size="large" color="#e65100" />
  </View>
);

const Dashboard = () => {
  const [screen, setScreen] = useState("Home");

  const renderScreen = () => {
    switch (screen) {
      case "Home":
        return <Home> </Home>;
      case "Report":
        return <ReportEmergency />;
      case "Notification":
        return <NotificationScreen></NotificationScreen>;
      case "Settings":
        return <ProfileSetting></ProfileSetting>;
      default:
        return <></>;
    }
  };

  const tabs = [
    { name: "Home", icon: "home-outline", label: "Home" },
    { name: "Report", icon: "alert-outline", label: "Report Emergency" },
    {
      name: "Notification",
      icon: "notifications-outline",
      label: "Notification",
    },
    { name: "Settings", icon: "person-outline", label: "Profile" },
  ];

  return (
    <Suspense fallback={<Loading />}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>{renderScreen()}</View>

        <View style={styles.navBar}>
          {tabs.map((tab, index) => {
            const isActive = screen === tab.name;
            return (
              <TouchableOpacity
                key={tab.name}
                onPress={() => setScreen(tab.name)}
                style={styles.tabContainer}
                activeOpacity={0.8}
              >
                {isActive ? (
                  <View style={styles.activeIconWrapper}>
                    <Ionicons name={tab.icon} size={26} color="#e65100" />
                  </View>
                ) : (
                  <>
                    <Ionicons name={tab.icon} size={24} color="#333" />
                    <Text style={styles.tabLabel}>{tab.label}</Text>
                  </>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </Suspense>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  tabContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  tabLabel: {
    fontSize: 11,
    color: "#333",
    marginTop: 3,
  },
  activeIconWrapper: {
    position: "absolute",
    top: -20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 30,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
