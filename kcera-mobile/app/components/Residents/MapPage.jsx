import { View, ScrollView, Image, StyleSheet, Text } from "react-native";
import MapView from "react-native-maps";

const logo = require("../../../assets/app-images/KCERA.png");

const MapPage = () => {
  const pageTitle = "Recent Emergencies";
  return (
    <View>
      <ScrollView>
        <View className="flex items-center ">
          <Image source={logo} style={styles.logo} />
          <Text className="text-lg font-bold ">{pageTitle}</Text>
        </View>
        <View>
          <MapView
            style={styles.map}
            mapType="hybrid"
            initialRegion={{
              latitude: 10.0125,
              longitude: 122.8121,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          ></MapView>
        </View>
      </ScrollView>
    </View>
  );
};

export default MapPage;

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  tabs: { marginTop: 20 },
  map: {
    width: "100%",
    height: 500,
    marginTop: 10,
  },
});
