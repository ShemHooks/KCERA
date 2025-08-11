import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import SendRequestApi from "../../api/residents/SendRequestApi";

const fire = require("../../../assets/app-images/Emergency/fire.png");
const flood = require("../../../assets/app-images/Emergency/flood.jpg");
const land_slide = require("../../../assets/app-images/Emergency/landslide.jpg");
const medical = require("../../../assets/app-images/Emergency/medical.jpg");
const traffic = require("../../../assets/app-images/Emergency/traffic.jpg");

const logo = require("../../../assets/app-images/KCERA.png");
const pageTitle = "Emergecny Reporting";

const ReportEmergency = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [pinnedLocation, setPinnedLocation] = useState(null);
  const [image, setImage] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);

  const [emergencyType, setEmergencyType] = useState(null);

  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

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

  useEffect(() => {
    const requestMediaPermission = async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Permission to access media library is required!");
        }
      }
    };

    requestMediaPermission();
  }, []);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Camera permission required.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];

      const mimeType =
        asset.type === "image"
          ? "image/jpeg"
          : asset.type === "video"
          ? "video/mp4"
          : asset.type;

      console.log("Mime Type: ", mimeType);

      setImage({
        uri: asset.uri,
        type: mimeType,
        name: asset.fileName || "photo.jpg",
      });
      setDisplayImage(asset.uri);
    }
  };

  const submitRequest = async () => {
    try {
      const response = await SendRequestApi(
        pinnedLocation,
        emergencyType,
        image
      );
      const result = response.success;

      if (result?.status === 200) {
        setMessage("Request submitted successfully! Thank You");
        setIsSuccess(true);
        setModalVisible(true);
      } else if (result?.status === 409) {
        setMessage(
          "Similar Emergency has been reported already. Response is on its way. Thank You!"
        );
        setIsSuccess(true);
        setModalVisible(true);
      } else {
        setMessage("Failed to submit request.");
        setIsSuccess(true);
      }
    } catch (error) {
      setIsSuccess(false);
      alert("An error occurred while submitting.");
    }
  };

  const clickOK = () => {
    setModalVisible(false);
    resetForm();
  };

  const resetForm = () => {
    setEmergencyType(null);
    setImage(null);
    setDisplayImage(null);
    setPinnedLocation(null);
    setIsSuccess(false);
  };

  return (
    <View className="w-full h-full">
      <ScrollView contentContainerStyle={styles.container}>
        <View className="flex items-center ">
          <Image source={logo} style={styles.logo} />
          <Text className="text-lg font-bold ">{pageTitle}</Text>
        </View>
        <View style={styles.emergencyView}>
          <Text className="mt-4 mb-2 text-xl font-bold ">
            What kind of incident are you reporting?
          </Text>

          <View style={styles.buttonsContainer}>
            {/*  */}
            <TouchableOpacity
              onPress={() => setEmergencyType("traffic")}
              style={[
                styles.incidentButton,
                emergencyType === "traffic" && styles.selectedIncident,
              ]}
            >
              <Image source={traffic} style={styles.buttonImage} />
              <Text style={styles.buttonText}>Traffic Accident</Text>
            </TouchableOpacity>
            {/*  */}
            <TouchableOpacity
              onPress={() => setEmergencyType("fire")}
              style={[
                styles.incidentButton,
                emergencyType === "fire" && styles.selectedIncident,
              ]}
            >
              <Image source={fire} style={styles.buttonImage} />
              <Text style={styles.buttonText}>Fire Incidents</Text>
            </TouchableOpacity>
            {/*  */}
            <TouchableOpacity
              onPress={() => setEmergencyType("medical")}
              style={[
                styles.incidentButton,
                emergencyType === "medical" && styles.selectedIncident,
              ]}
            >
              <Image source={medical} style={styles.buttonImage} />
              <Text style={styles.buttonText}>Medical Emergencies</Text>
            </TouchableOpacity>
            {/*  */}
            <TouchableOpacity
              onPress={() => setEmergencyType("flood")}
              style={[
                styles.incidentButton,
                emergencyType === "flood" && styles.selectedIncident,
              ]}
            >
              <Image source={flood} style={styles.buttonImage} />
              <Text style={styles.buttonText}>Flood</Text>
            </TouchableOpacity>
            {/*  */}
            <TouchableOpacity
              onPress={() => setEmergencyType("landslide")}
              style={[
                styles.incidentButton,
                emergencyType === "landslide" && styles.selectedIncident,
              ]}
            >
              <Image source={land_slide} style={styles.buttonImage} />
              <Text style={styles.buttonText}>Landslide Incidents</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mapContainer}>
            <Text className="mt-4 mb-2 text-xl font-bold ">
              Where is the location of the emergency?
            </Text>
            <MapView
              style={styles.map}
              mapType="hybrid"
              initialRegion={{
                latitude: userLocation ? userLocation.coords.latitude : 10.0125,
                longitude: userLocation
                  ? userLocation.coords.longitude
                  : 122.8121,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              onPress={(e) => {
                const { latitude, longitude } = e.nativeEvent.coordinate;
                setPinnedLocation({ latitude, longitude });
              }}
            >
              {userLocation && userLocation.coords && (
                <Marker
                  coordinate={{
                    latitude: userLocation.coords.latitude,
                    longitude: userLocation.coords.longitude,
                  }}
                  title="My Location"
                  description="This is your current location"
                />
              )}

              {pinnedLocation && (
                <Marker
                  coordinate={pinnedLocation}
                  title="Pinned Location"
                  description={`Lat: ${pinnedLocation.latitude.toFixed(
                    4
                  )}, Lng: ${pinnedLocation.longitude.toFixed(4)}`}
                  pinColor="red"
                  draggable
                  onDragEnd={(e) => setPinnedLocation(e.nativeEvent.coordinate)}
                />
              )}
            </MapView>
            <TouchableOpacity
              style={styles.useLocationBtn}
              onPress={() => {
                if (userLocation?.coords) {
                  setPinnedLocation({
                    latitude: userLocation.coords.latitude,
                    longitude: userLocation.coords.longitude,
                  });
                }
              }}
            >
              <Text style={styles.useLocationBtnText}>
                Use My Current Location
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            {typeof displayImage === "string" && displayImage !== "" && (
              <View style={styles.imageView}>
                <Image
                  source={{ uri: displayImage }}
                  style={styles.cameraPhoto}
                />
              </View>
            )}

            <TouchableOpacity onPress={takePhoto} style={styles.cameraButton}>
              <Ionicons name="camera-outline" size={24} color="#757575" />
              <Text>{image ? "Retake Photo" : "Take a Photo"}</Text>
            </TouchableOpacity>
          </View>
          {emergencyType && image && pinnedLocation ? (
            <View>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={submitRequest}
              >
                <Text className="font-bold">Submit</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {isSuccess && (
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalText}>{message}</Text>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={clickOK}
                  >
                    <Text style={styles.modalButtonText}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ReportEmergency;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  emergencyView: {
    marginTop: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  incidentButton: {
    backgroundColor: "transparent",
    width: "48%",
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: "center",
    elevation: 1,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
  },
  buttonImage: {
    width: 100,
    height: 100,
  },
  mapContainer: {
    marginTop: 16,
    height: 500,
    borderRadius: 10,
    overflow: "hidden",
  },

  map: {
    flex: 1,
  },

  useLocationBtn: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 4,
  },

  useLocationBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  cameraButton: {
    marginTop: 30,
    marginBottom: 12,
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },

  imageView: {
    marginTop: 16,
    height: 500,
    borderRadius: 10,
    overflow: "hidden",
  },

  cameraPhoto: {
    width: "100%",
    height: "100%",
  },

  selectedIncident: {
    borderWidth: 1,
    borderColor: "red",
  },

  submitButton: {
    marginTop: 30,
    marginBottom: 12,
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
    elevation: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
