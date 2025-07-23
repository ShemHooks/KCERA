import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const RegistrationConfirmation = ({ formData }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Confirm Registration</Text>

      <Text style={styles.label}>Full Name:</Text>
      <Text style={styles.value}>{formData.name}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{formData.email}</Text>

      <Text style={styles.label}>Home Address:</Text>
      <Text style={styles.value}>{formData.address}</Text>

      <Text style={styles.label}>Phone Number:</Text>
      <Text style={styles.value}>{formData.phone}</Text>

      <Text style={styles.label}>Gender:</Text>
      <Text style={styles.value}>{formData.gender}</Text>

      {formData.frontImage && (
        <View style={styles.imageContainer}>
          <Text style={styles.label}>Front of Valid ID</Text>
          <Image source={{ uri: formData.frontImage }} style={styles.image} />
        </View>
      )}

      {formData.backImage && (
        <View style={styles.imageContainer}>
          <Text style={styles.label}>Back of Valid ID</Text>
          <Image source={{ uri: formData.backImage }} style={styles.image} />
        </View>
      )}

      {formData.facePhoto && (
        <View style={styles.imageContainer}>
          <Text style={styles.label}>Face Photo</Text>
          <Image source={{ uri: formData.facePhoto }} style={styles.image} />
        </View>
      )}
    </ScrollView>
  );
};

export default RegistrationConfirmation;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  value: {
    marginBottom: 10,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: 250,
    height: 150,
    resizeMode: "contain",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
});
