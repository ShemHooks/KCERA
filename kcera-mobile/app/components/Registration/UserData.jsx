import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ImageInput from "./ImageUpload";

const UserData = ({ formData, updateField }) => {
  const Options = ["male", "female", "non-binary"];

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Full Name"
        value={formData.name}
        onChangeText={(text) => updateField("name", text)}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Email (e.g., user@gmail.com)"
        value={formData.email}
        onChangeText={(text) => updateField("email", text)}
        keyboardType="email-address"
        style={styles.textInput}
      />
      <TextInput
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => updateField("password", text)}
        secureTextEntry
        style={styles.textInput}
      />
      <TextInput
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(text) => updateField("confirmPassword", text)}
        secureTextEntry
        style={styles.textInput}
      />
      <TextInput
        placeholder="Complete Home Address"
        value={formData.address}
        onChangeText={(text) => updateField("address", text)}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Phone Number"
        value={formData.phone}
        onChangeText={(text) => updateField("phone", text)}
        keyboardType="phone-pad"
        style={styles.textInput}
      />
      <View style={{ marginTop: 20 }}>
        <Text style={{ marginBottom: 10 }}>Gender:</Text>
        {Options.map((opt) => (
          <TouchableOpacity
            key={opt}
            style={styles.radioContainer}
            onPress={() => updateField("gender", opt)}
          >
            <View style={styles.outerCircle}>
              {formData.gender === opt && <View style={styles.innerCircle} />}
            </View>
            <Text style={styles.radioText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ImageInput
        frontImage={formData.frontImage}
        backImage={formData.backImage}
        setFrontImage={(uri) => updateField("frontImage", uri)}
        setBackImage={(uri) => updateField("backImage", uri)}
      />
    </View>
  );
};

export default UserData;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  textInput: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 20,
    paddingLeft: 10,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#333",
  },
  radioText: {
    fontSize: 16,
  },
});
