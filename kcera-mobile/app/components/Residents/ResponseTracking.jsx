import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import MapView, {
  Marker,
  Polyline,
  UrlTile,
  PROVIDER_GOOGLE,
  WMSTile,
} from "react-native-maps";
import TrackResponseApi from "../../api/residents/TrackResponseApi";

const ResponseTracking = ({ response_id }) => {
  const [responseData, setResponseData] = useState(null);
  const [emergencyLocation, setEmergencyLocation] = useState(null);
  const [responseLocation, setResponseLocation] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);

  const ambulance = require("../../../assets/app-images/markers/ambulance.png");

  useEffect(() => {
    if (response_id) fetchResponse();
  }, [response_id]);

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

  const fetchResponse = async () => {
    try {
      const result = await TrackResponseApi(response_id);
      if (result.success) {
        const data = result.data;
        setResponseData(data);

        const emergencyLoc = {
          latitude: parseFloat(data.report.latitude),
          longitude: parseFloat(data.report.longitude),
        };
        const responderLoc = {
          latitude: parseFloat(data.current_latitude),
          longitude: parseFloat(data.current_longitude),
        };

        setEmergencyLocation(emergencyLoc);
        setResponseLocation(responderLoc);

        // fetch route between responder and emergency
        fetchRoute(responderLoc, emergencyLoc);
      } else {
        console.error("Failed to fetch response data:", result.error);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapType="hybrid"
        initialRegion={{
          latitude: responseLocation ? responseLocation.latitude : 10.0125,
          longitude: responseLocation ? responseLocation.longitude : 122.8121,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Satellite imagery */}
        <UrlTile urlTemplate="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />

        {/* Overlay labels */}
        <WMSTile
          urlTemplate="https://cartodb-basemaps-a.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}.png"
          zIndex={1}
        />

        {/* Response (ambulance) marker */}
        {responseLocation && (
          <Marker coordinate={responseLocation} title="Responder Location">
            <Image
              source={ambulance}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          </Marker>
        )}

        {/* Emergency marker */}
        {emergencyLocation && (
          <Marker
            coordinate={emergencyLocation}
            title="Emergency Location"
            pinColor="red"
          />
        )}

        {/* Route between them */}
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

export default ResponseTracking;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
