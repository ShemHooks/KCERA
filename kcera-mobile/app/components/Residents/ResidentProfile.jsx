import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ResidentProfile = () => {
  const logOut = () => {};
  return (
    <View>
      <View>
        <TouchableOpacity style={styles.logoutButton}>
          <Text className="text-xl font-bold text-red-500">LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResidentProfile;

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: "#fff",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
