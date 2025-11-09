import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import MapView, { Marker, UrlTile } from "react-native-maps";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import GestureRecognizer from "react-native-swipe-gestures";
import SendRequestApi from "../../api/residents/SendRequestApi";
import ReportSuccess from "./ReportSuccess";
import ReportSimilar from "./ReportSimilar";

const fire = require("../../../assets/app-images/Emergency/fire.png");
const flood = require("../../../assets/app-images/Emergency/flood.jpg");
const land_slide = require("../../../assets/app-images/Emergency/landslide.jpg");
const medical = require("../../../assets/app-images/Emergency/medical.jpg");
const traffic = require("../../../assets/app-images/Emergency/traffic.jpg");

const ReportEmergency = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [pinnedLocation, setPinnedLocation] = useState(null);
  const [image, setImage] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [emergencyType, setEmergencyType] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getLocation();
    requestMediaPermission();
  }, []);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied to access location.");
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    setUserLocation(location);
  };

  const requestMediaPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library is required!");
      }
    }
  };

  useEffect(() => {
    if (emergencyType && currentStep === 1) setCurrentStep(2);
  }, [emergencyType]);

  useEffect(() => {
    if (pinnedLocation && currentStep === 2) setCurrentStep(3);
  }, [pinnedLocation]);

  const onSwipeLeft = () => {
    if (currentStep < 3) setCurrentStep((prev) => prev + 1);
  };

  const onSwipeRight = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

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

      setImage({
        uri: asset.uri,
        type: mimeType,
        name: asset.fileName || "photo.jpg",
      });
      setDisplayImage(asset.uri);
    }
  };

  const submitRequest = async () => {
    setIsLoading(true);
    try {
      const response = await SendRequestApi(
        pinnedLocation,
        emergencyType,
        image
      );
      const result = response.success;

      if (result?.status === 200) {
        setMessage("Success");
        setIsSuccess(true);
      } else if (result?.status === 409) {
        setMessage("Similar");
        setIsSuccess(true);
      } else {
        setMessage("Failed");
        setIsSuccess(true);
      }
    } catch (error) {
      alert("An error occurred while submitting.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmergencyType(null);
    setImage(null);
    setDisplayImage(null);
    setPinnedLocation(null);
    setIsSuccess(false);
    setMessage("");
    setCurrentStep(1);
  };

  return (
    <View className="w-full h-full">
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: "#fff", marginTop: 10 }}>
            Submitting Request...
          </Text>
        </View>
      )}

      <GestureRecognizer onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight}>
        <ScrollView contentContainerStyle={styles.container}>
          {!isSuccess ? (
            <>
              {/* STEP 1: Select Type */}
              {currentStep === 1 && (
                <View style={styles.emergencyView}>
                  <Text style={styles.text}>Select Type of Incident</Text>
                  <View style={styles.buttonsContainer}>
                    {[
                      {
                        type: "traffic",
                        img: traffic,
                        label: "Traffic Accident",
                      },
                      { type: "fire", img: fire, label: "Fire Incidents" },
                      {
                        type: "medical",
                        img: medical,
                        label: "Medical Emergencies",
                      },
                      { type: "flood", img: flood, label: "Flood" },
                      {
                        type: "landslide",
                        img: land_slide,
                        label: "Landslide Incidents",
                      },
                    ].map((item) => (
                      <TouchableOpacity
                        key={item.type}
                        onPress={() => setEmergencyType(item.type)}
                        style={[
                          styles.incidentButton,
                          emergencyType === item.type &&
                            styles.selectedIncident,
                        ]}
                      >
                        <Image source={item.img} style={styles.buttonImage} />
                        <Text style={styles.buttonText}>{item.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {/* STEP 2: Pin Location */}
              {currentStep === 2 && (
                <View style={styles.mapContainer}>
                  <Text style={styles.text}>Pin Incident Location?</Text>
                  <MapView
                    style={styles.map}
                    initialRegion={{
                      latitude: userLocation
                        ? userLocation.coords.latitude
                        : 10.0125,
                      longitude: userLocation
                        ? userLocation.coords.longitude
                        : 122.8121,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }}
                    onPress={(e) => setPinnedLocation(e.nativeEvent.coordinate)}
                  >
                    <UrlTile
                      urlTemplate="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                      maximumZ={19}
                    />
                    <UrlTile urlTemplate="https://cartodb-basemaps-a.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}.png" />

                    {userLocation?.coords && (
                      <Marker
                        coordinate={{
                          latitude: userLocation.coords.latitude,
                          longitude: userLocation.coords.longitude,
                        }}
                        title="My Location"
                        pinColor="blue"
                      />
                    )}

                    {pinnedLocation && (
                      <Marker
                        coordinate={pinnedLocation}
                        title="Pinned Location"
                        pinColor="red"
                        draggable
                        onDragEnd={(e) =>
                          setPinnedLocation(e.nativeEvent.coordinate)
                        }
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
              )}

              {/* STEP 3: Upload Photo & Submit */}
              {currentStep === 3 && (
                <View>
                  {displayImage && (
                    <View style={styles.imageView}>
                      <Image
                        source={{ uri: displayImage }}
                        style={styles.cameraPhoto}
                      />
                    </View>
                  )}

                  <TouchableOpacity
                    onPress={takePhoto}
                    style={styles.cameraButton}
                  >
                    <Ionicons name="camera-outline" size={30} color="#757575" />
                    <Text>{image ? "Retake Photo" : "Take a Photo"}</Text>
                  </TouchableOpacity>

                  {emergencyType && image && pinnedLocation && (
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={submitRequest}
                    >
                      <Text className="font-bold">Submit</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </>
          ) : (
            <View style={styles.successContainer}>
              {message === "Success" && <ReportSuccess onGoHome={resetForm} />}
              {message === "Similar" && <ReportSimilar />}
              {message === "Failed" && (
                <Text style={styles.similarText}>
                  Failed to submit your report. Please try again.
                </Text>
              )}
            </View>
          )}
        </ScrollView>
      </GestureRecognizer>
    </View>
  );
};

export default ReportEmergency;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingBottom: 24 },
  text: { fontSize: 25, fontWeight: "bold" },
  emergencyView: { marginTop: 30 },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 4,
    marginTop: 20,
  },
  incidentButton: {
    backgroundColor: "#fff",
    width: "48%",
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  selectedIncident: { borderWidth: 1, borderColor: "red" },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
  },
  buttonImage: { width: 100, height: 100 },
  mapContainer: {
    marginTop: 20,
    gap: 20,
    height: 550,
    borderRadius: 10,
    overflow: "hidden",
  },
  map: { flex: 1 },
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
  useLocationBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
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
  cameraPhoto: { width: "100%", height: "100%" },
  submitButton: {
    marginTop: 30,
    marginBottom: 12,
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  similarText: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  modalButtonText: { color: "#fff", fontWeight: "bold" },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});
