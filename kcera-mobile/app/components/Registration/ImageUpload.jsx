import * as ImagePicker from "expo-image-picker";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export default function ImageInput({
  frontImage,
  backImage,
  setFrontImage,
  setBackImage,
}) {
  const pickImage = async (side) => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      side === "front" ? setFrontImage(uri) : setBackImage(uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.uploadBtn}
        onPress={() => pickImage("front")}
      >
        <Text style={styles.uploadText}>Upload Valid ID - Front Side</Text>
      </TouchableOpacity>
      {frontImage && (
        <Image source={{ uri: frontImage }} style={styles.preview} />
      )}

      <TouchableOpacity
        style={styles.uploadBtn}
        onPress={() => pickImage("back")}
      >
        <Text style={styles.uploadText}>Upload Valid ID - Back Side</Text>
      </TouchableOpacity>
      {backImage && (
        <Image source={{ uri: backImage }} style={styles.preview} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  uploadBtn: {
    backgroundColor: "grey",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    width: "90%",
    alignItems: "center",
  },
  uploadText: {
    color: "#fff",
    fontWeight: "bold",
  },
  preview: {
    marginTop: 10,
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
