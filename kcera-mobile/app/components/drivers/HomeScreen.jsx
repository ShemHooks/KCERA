import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import GetEmergencyApi from "../../api/drivers/GetEmergencyApi";
import socket from "../../api/utility/socket";
import RespondToEmergencyApi from "../../api/drivers/RespondToEmergencyApi";

import WarningSignal from "./WarningSignal";

const HomeScreen = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [emergency, SetEmergency] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]); // route for selected emergency

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

      if (emergencyData) {
        SetEmergency(emergencyData);
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
      alert("Permission denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location);
  };

  const fetchRoute = async (start, end) => {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?overview=full&geometries=geojson`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes?.length) {
        const coords = data.routes[0].geometry.coordinates.map(
          ([lon, lat]) => ({
            latitude: lat,
            longitude: lon,
          })
        );
        setRouteCoords(coords);
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  const RespondToEmergency = async (id, coords) => {
    try {
      await RespondToEmergencyApi(id, userLocation);

      if (userLocation?.coords) {
        const start = {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        };
        fetchRoute(start, coords); // fetch route from OSRM
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <MapView
        style={styles.map}
        mapType="hybrid"
        initialRegion={{
          latitude: userLocation ? userLocation.coords.latitude : 10.0125,
          longitude: userLocation ? userLocation.coords.longitude : 122.8121,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Driver location */}
        {userLocation?.coords && (
          <Marker
            coordinate={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            }}
            title="My Location"
          />
        )}

        {/* Emergencies */}
        {emergency &&
          emergency.map((e) => {
            const coords = {
              latitude: parseFloat(e.latitude),
              longitude: parseFloat(e.longitude),
            };
            return (
              <Marker
                key={e.id}
                coordinate={coords}
                title={`Emergency: ${e.request_type}`}
                description={`Reported by ${e.user?.name}`}
                onPress={() => RespondToEmergency(e.id, coords)}
                anchor={{ x: 0.5, y: 0.5 }}
              >
                <WarningSignal />
              </Marker>
            );
          })}

        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeWidth={5}
            strokeColor="blue"
          />
        )}
      </MapView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  map: {
    height: "100%",
  },
});
