import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const ReportSuccess = ({ onGoHome }) => {
  const check = require("../../../assets/app-images/others/check.png");
  return (
    <View style={styles.container}>
      <View style={styles.ViewStyle}>
        <Image source={check} style={styles.img} />
        <Text style={styles.text1}>Success!</Text>
        <Text style={styles.text2}>Report has been submitted.</Text>
        <TouchableOpacity style={styles.button} onPress={onGoHome}>
          <Text style={styles.text3}>Go Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReportSuccess;

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
    marginBottom: 10,
  },
  text1: {
    fontWeight: "bold",
    fontSize: 41,
    color: "#008000",
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
