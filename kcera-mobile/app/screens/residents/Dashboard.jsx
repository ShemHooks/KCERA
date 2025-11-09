import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, lazy, Suspense } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

// Lazy imports
const HomeScreen = lazy(() => import("../../components/Residents/MapPage"));
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

const defaultProfile = require("../../../assets/app-images/default-user.jpg");

const Dashboard = () => {
  const [screen, setScreen] = useState("Home");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    (async () => {
      const user_name = await SecureStore.getItemAsync("userName");
      const user_role = await SecureStore.getItemAsync("userRole");
      setName(user_name);
      setRole(user_role);
    })();
  }, []);

  const toSentenceCase = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const renderScreen = () => {
    switch (screen) {
      case "Home":
        return <ReportEmergency />;
      case "Weather":
        return <HomeScreen />;
      case "Notification":
        return <NotificationScreen />;
      case "Settings":
        return <ProfileSetting />;
      default:
        return <ReportEmergency />;
    }
  };

  const tabs = [
    { name: "Home", icon: "home-outline", label: "Home" },
    { name: "Weather", icon: "partly-sunny-outline", label: "Weather" },
    {
      name: "profile",
      icon: "person-outline",
      label: "Account",
    },
    { name: "Settings", icon: "options-outline", label: "Setting" },
  ];

  return (
    <Suspense fallback={<Loading />}>
      <SafeAreaView style={styles.container}>
        {/* HEADER - Hidden when on Settings */}
        {screen !== "Settings" && screen !== "Notification" && (
          <View style={styles.header}>
            <View style={styles.welcome}>
              <View style={styles.imgContainer}>
                <Image source={defaultProfile} style={styles.userImg} />
              </View>
              <View>
                <Text style={styles.greet}>Hi {name}!</Text>
                <Text style={styles.role}>{toSentenceCase(role)}</Text>
              </View>
            </View>
            <View style={styles.rigthSideHeader}>
              <TouchableOpacity onPress={() => setScreen("Notification")}>
                <Ionicons name="notifications-outline" size={30} color="#fff" />
              </TouchableOpacity>
              <View
                style={{
                  position: "absolute",
                  right: 15,
                  top: 38,
                  backgroundColor: "red",
                  borderRadius: 8,
                  width: 12,
                  height: 12,
                }}
              />
            </View>
          </View>
        )}

        {/* CONTENT AREA */}
        <View
          style={[
            styles.content,
            screen === "Settings" && {
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            },
          ]}
        >
          {renderScreen()}
        </View>

        {/* NAV BAR */}
        <View style={styles.navBarContainer}>
          <View style={styles.navBar}>
            {tabs.map((tab, index) => {
              const isActive = screen === tab.name;
              return (
                <TouchableOpacity
                  key={tab.name}
                  onPress={() => setScreen(tab.name)}
                  style={styles.tabContainer}
                  activeOpacity={1}
                >
                  {isActive ? (
                    <View style={styles.activeIconWrapper}>
                      <Ionicons name={tab.icon} size={26} color="#e65100" />
                    </View>
                  ) : (
                    <>
                      <Ionicons name={tab.icon} size={24} color="#fff" />
                      <Text style={styles.tabLabel}>{tab.label}</Text>
                    </>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    </Suspense>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#11224E",
  },
  header: {
    flexDirection: "row",
    height: 85,
  },
  welcome: {
    width: "50%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: 12,
  },
  greet: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  role: {
    fontSize: 12,
    color: "#fff",
  },
  imgContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#fff",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  userImg: {
    width: "100%",
    height: "100%",
  },
  rigthSideHeader: {
    width: "50%",
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingRight: 20,
    position: "relative",
    paddingBottom: 12,
  },
  content: {
    flex: 1,
    backgroundColor: "#E8F9FF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navBarContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    top: "96%",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#11224E",
    borderRadius: 20,
    elevation: 15,
    width: "95%",
  },
  tabContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  tabLabel: {
    fontSize: 11,
    color: "#fff",
    marginTop: 3,
  },
  activeIconWrapper: {
    position: "absolute",
    top: -35,
    backgroundColor: "#11224E",
    padding: 16,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "#E8F9FF",
    elevation: 10,
    zIndex: 9999,
    overflow: "hidden",
  },
});
