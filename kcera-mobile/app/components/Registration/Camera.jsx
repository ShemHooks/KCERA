import * as ImagePicker from "expo-image-picker";
import { Button, Image, StyleSheet, View } from "react-native";

export default function Camera({ image, setImage }) {
  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title={image ? "Retake Face Photo" : "Take Face Photo"}
        onPress={takePhoto}
      />
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    marginTop: 10,
    width: 400,
    height: 400,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
