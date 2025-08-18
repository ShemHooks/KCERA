import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import GetEmergencyApi from "../../api/drivers/GetEmergencyApi";
import socket from "../../api/utility/socket";

const fireIcon = require("../../../assets/app-images/markers/flame.png");
const trafficIcon = require("../../../assets/app-images/markers/traffic.png");
const medicalIcon = require("../../../assets/app-images/markers/medical.png");
const floodIcon = require("../../../assets/app-images/markers/flood.png");
const landslideIcon = require("../../../assets/app-images/markers/landslide.png");

const HomeScreen = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [emergency, SetEmergency] = useState(null);
  const [emergencyLocation, SetEmergencyLocation] = useState(null);

  useEffect(() => {
    const listener = () => getEmergencies();
    socket.on("CheckVerifiedEmergency", listener);

    getEmergencies();

    return () => {
      socket.off("CheckVerifiedEmergency", listener);
    };
  }, []);

  const getEmergencies = async () => {
    try {
      const res = await GetEmergencyApi();
      const emergencyData = res?.data?.data;

      if (Array.isArray(emergencyData)) {
        console.log("array");
      } else {
        console.log("not array");
      }

      if (emergencyData) {
        console.log("true");
        SetEmergency(emergencyData);
        const locations = emergencyData.map((e) => ({
          latitude: e.latitude,
          longitude: e.longitude,
          type: e.request_type,
        }));

        console.log("location", locations);

        SetEmergencyLocation(locations);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("permission denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location);
  };

  console.log("emergecny location", emergencyLocation);
  return (
    <View>
      <MapView
        style={styles.map}
        mapType="hybrid"
        initialRegion={{
          latitude: userLocation ? userLocation.coords.latitude : 10.0125,
          longitude: userLocation ? userLocation.coords.longitude : 122.8121,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {userLocation?.coords && (
          <Marker
            coordinate={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            }}
            title="My Location"
            description="This is your current location"
          />
        )}

        {emergency &&
          emergency.map((e) => (
            <Marker
              key={e.id}
              coordinate={{
                latitude: parseFloat(e.latitude),
                longitude: parseFloat(e.longitude),
              }}
              title={`Emergency: ${e.request_type}`}
              description={`Reported by ${e.user?.name}`}
            >
              {e.request_type.toLowerCase() === "fire" ? (
                <View style={styles.marker}>
                  <Image
                    source={fireIcon}
                    style={styles.markerIcon}
                    resizeMode="contain"
                  />
                </View>
              ) : e.request_type.toLowerCase() === "traffic" ? (
                <Image
                  source={trafficIcon}
                  style={styles.markerIcon}
                  resizeMode="contain"
                />
              ) : e.request_type.toLowerCase() === "flood" ? (
                <Image
                  source={floodIcon}
                  style={styles.markerIcon}
                  resizeMode="contain"
                />
              ) : e.request_type.toLowerCase() === "medical" ? (
                <Image
                  source={medicalIcon}
                  style={styles.markerIcon}
                  resizeMode="contain"
                />
              ) : e.request_type.toLowerCase() === "landslide" ? (
                <Image
                  source={landslideIcon}
                  style={styles.markerIcon}
                  resizeMode="contain"
                />
              ) : null}

              <Callout>
                <TouchableOpacity>
                  <Text style={{ color: "blue", fontWeight: "bold" }}>
                    Respond
                  </Text>
                </TouchableOpacity>
              </Callout>
            </Marker>
          ))}
      </MapView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  map: {
    height: "100%",
  },
  marker: {
    width: 200,
    height: 200,
  },
  markerIcon: {
    width: 70,
    height: 70,
  },
});
