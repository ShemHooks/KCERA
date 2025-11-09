import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const ReportSimilar = () => {
  const failed = require("../../../assets/app-images/others/failed.jpg");
  return (
    <View style={styles.container}>
      <View style={styles.ViewStyle}>
        <Image source={failed} style={styles.img} />
        <Text style={styles.text1}>Failed To Submit Report!</Text>
        <Text style={styles.text2}>Similar Emergency has been Reported.</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text3}>Check Similar Emergency</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReportSimilar;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  ViewStyle: {
    backgroundColor: "#FFFFFF",
    width: "90%",
    height: 400,
    borderRadius: 10,
    alignItems: "center",
    paddingTop: 30,
    elevation: 8,
  },
  img: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  text1: {
    fontWeight: "bold",
    fontSize: 31,
    color: "#FF5B40",
  },
  text2: {
    fontSize: 16,
    color: "#000000",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#FF5A60",
    width: 250,
    marginTop: 70,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text3: {
    color: "#ffffff",
  },
});
