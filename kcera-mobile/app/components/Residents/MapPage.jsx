import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

const logo = require("../../../assets/app-images/KCERA.png");

const weatherIcons = {
  0: { icon: "☀️", label: "Clear Sky" },
  1: { icon: "🌤️", label: "Mainly Clear" },
  2: { icon: "⛅", label: "Partly Cloudy" },
  3: { icon: "☁️", label: "Overcast" },
  45: { icon: "🌫️", label: "Fog" },
  48: { icon: "🌫️", label: "Depositing Rime Fog" },
  51: { icon: "🌦️", label: "Light Drizzle" },
  61: { icon: "🌧️", label: "Rain" },
  71: { icon: "❄️", label: "Snow" },
  95: { icon: "⛈️", label: "Thunderstorm" },
};

const MapPage = () => {
  const pageTitle = "Weather Forecast";
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState("Fetching location...");
  const [weather, setWeather] = useState(null);
  const [coords, setCoords] = useState(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setLoading(true);

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          alert("Location permission denied");
          setLocationName("Permission denied");
          setLoading(false);
          return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = loc.coords;
        if (isMounted) setCoords({ latitude, longitude });

        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          {
            headers: {
              Referer: "kcera-mobile-development",
            },
          }
        );
        const geoText = await geoRes.text();
        console.log("Geo Response:", geoText);

        const geoData = JSON.parse(geoText);
        if (isMounted) {
          setLocationName(
            `${
              geoData.address?.city ||
              geoData.address?.town ||
              geoData.address?.village ||
              "Unknown"
            }, ${geoData.address?.state || ""}`
          );
        }

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code,surface_pressure,uv_index&hourly=temperature_2m,weather_code,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset&forecast_days=7&timezone=auto`
        );
        const weatherText = await weatherRes.text();
        console.log("Weather Response:", weatherText);

        const weatherData = JSON.parse(weatherText);
        if (isMounted) setWeather(weatherData);
      } catch (err) {
        console.error(err);
        if (isMounted) setLocationName("Error fetching data");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const current = weather?.current || {};
  const daily = weather?.daily || {};
  const condition = weatherIcons[current.weather_code] || {
    icon: "❓",
    label: "Unknown",
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "--:--";
    return new Date(timeStr).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <View
      style={{ flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
    >
      <View style={styles.container}>
        <MapView
          style={styles.map}
          mapType="hybrid"
          initialRegion={{
            latitude: coords?.latitude || 10.0912665,
            longitude: coords?.longitude || 122.7498264,
            latitudeDelta: 11.93,
            longitudeDelta: 11.93,
          }}
        />
      </View>
      {/* Floating Weather Card */}
      <View style={styles.weatherCard}>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <>
            <Text style={styles.location} className="text-center text-white">
              {locationName}
            </Text>
            <View style={styles.row}>
              <Text style={styles.temp} className="text-white">
                {condition.icon} {current.temperature_2m ?? "--"}°C
              </Text>
              <Text style={styles.temp} className="text-white">
                🕒{" "}
                {time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
            <View style={styles.row}>
              <Text className="text-white">
                💧 {current.relative_humidity_2m ?? "--"}%
              </Text>
              <Text className="text-white">
                🌬️ {current.wind_speed_10m ?? "--"} km/h
              </Text>
              <Text className="text-white">
                ☀️ UV {current.uv_index ?? "--"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text className="text-white">
                Feels: {current.apparent_temperature ?? "--"}°C
              </Text>
              <Text className="text-white">
                Pressure: {current.surface_pressure ?? "--"} hPa
              </Text>
            </View>
            <View style={styles.row}>
              <Text className="text-white">
                🌅 {formatTime(daily.sunrise?.[0])}
              </Text>
              <Text className="text-white">
                🌇 {formatTime(daily.sunset?.[0])}
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default MapPage;

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
  weatherCard: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 20,
    elevation: 5,
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  location: {
    fontSize: 20,
    fontWeight: "bold",
  },
  temp: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    marginTop: 20,
  },
});
