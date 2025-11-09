import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useEffect, useState } from "react";

// Api
import LogoutApi from "../../api/authApi/LogoutApi";
import GetUserInfoApi from "../../api/residents/GetUserInfoApi";
import ROUTES from "../../constant/routes";
import { router } from "expo-router";

const defaultProfile = require("../../../assets/app-images/default-user.jpg");

const ResidentProfile = () => {
  const [userName, setUserName] = useState("");
  const [page, setPage] = useState(null);

  useEffect(() => {
    const userInfo = async () => {
      try {
        const apiResponse = await GetUserInfoApi();
        const userData = apiResponse.user;

        if (!userData) {
          console.warn("No user data found");
          return;
        }
        const userName = userData.data.name;
        setUserName(userName);
      } catch (error) {
        console.error("failed to fetch user", error);
      }
    };

    userInfo();
  }, []);

  const logOut = () => {
    LogoutApi();
  };

  const goToAbout = () => {
    router.push(ROUTES.EVERYONE.ABOUT);
  };

  return (
    <View style={styles.container}>
      <View style={styles.HeaderView}>
        <Text style={styles.title}>Settings</Text>
      </View>
      <View style={styles.tabs}></View>
      <ScrollView>
        <View style={styles.tabs} className="p-4">
          <View>
            <Text className="text-lg font-bold" style={styles.label}>
              Accounts
            </Text>
          </View>
          <TouchableOpacity style={styles.button} className="pl-4">
            <View>
              <Ionicons name="person" size={30} color="#333" />
            </View>
            <View>
              <Text className="text-xl font-bold text-black">
                Account Setting
              </Text>
              <Text style={styles.label}> {"  "}Manage your account</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.line}></View>
        <View style={styles.tabs} className="p-4">
          <View>
            <Text className="text-lg font-bold" style={styles.label}>
              SECURITY
            </Text>
          </View>
          <TouchableOpacity style={styles.button} className="pl-4">
            <View>
              <FontAwesome5 name="users" size={30} color="#333" />
            </View>
            <View>
              <Text className="text-xl font-bold text-black">
                Community Guidlines
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.tabs}></View>
          <TouchableOpacity style={styles.button} className="pl-4">
            <View>
              <FontAwesome5 name="file-alt" size={30} color="#333" />
            </View>
            <View>
              <Text className="text-xl font-bold text-black">
                Privacy Policy
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.tabs}></View>
          <TouchableOpacity
            onPress={goToAbout}
            style={styles.button}
            className="pl-4"
          >
            <View>
              <FontAwesome5 name="info" size={24} color="#333" />
            </View>
            <View>
              <Text className="text-xl font-bold text-black">About</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line}></View>
        <View style={styles.tabs} className="p-4">
          <View>
            <Text className="text-lg font-bold" style={styles.label}>
              Support
            </Text>
          </View>
          <TouchableOpacity style={styles.button} className="pl-4">
            <View>
              <FontAwesome5 name="headset" size={30} color="#333" />
            </View>
            <View>
              <Text className="text-xl font-bold text-black">
                Report a Problem
              </Text>
              <Text style={styles.label}> {"  "}Contact Tech Support</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.line, styles.tabs]}></View>
        <View style={styles.tabs} className="p-4">
          <TouchableOpacity style={styles.logoutButton} onPress={logOut}>
            <Text className="text-xl font-bold text-red-500">LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ResidentProfile;

const styles = StyleSheet.create({
  // container: { backgroundColor: "#fff" },
  HeaderView: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  line: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 7,
  },
  tabs: { marginTop: 7, marginBottom: 7 },
  button: {
    backgroundColor: "#E8F9FE",
    height: 70,

    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    borderRadius: 5,
  },
  logoutButton: {
    backgroundColor: "#E8F9FF",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    borderRadius: 5,
  },
  profilePictureContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    overflow: "hidden",
  },

  profilePicture: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  label: {
    color: "#6B7280",
  },
});
