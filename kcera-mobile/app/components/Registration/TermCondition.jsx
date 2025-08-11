import { useState } from "react";
import {
  Button,
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TermCondition() {
  const [visible, setVisible] = useState(true);
  const [accepted, setAccepted] = useState(false);

  const handleContinue = () => {
    if (accepted) setVisible(false);
  };

  const toggleCheckbox = () => setAccepted(!accepted);

  return (
    <Modal visible={visible} transparent={false} animationType="slide">
      <View style={styles.modalContainer}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <View style={styles.modalContent}>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                style={{ flex: 1 }}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={require("../../../assets/app-images/KCERA.png")}
                    style={styles.logo}
                  />
                </View>

                <Text style={styles.title}>Terms & Conditions</Text>

                <View style={styles.termsList}>
                  {[
                    "KCERA helps residents report emergencies, notify responders, and track reports.",
                    "You must provide accurate info and avoid false reports or spam.",
                    "Your personal data is only used for emergency response, not shared unless legally required.",
                    "KCERA is not a replacement for emergency hotlines — those remain available.",
                    "Delays may occur due to internet issues or power loss; developers are not liable.",
                    "Dispatchers handle reports, announcements, and summons — misuse of admin privileges can result in disciplinary action.",
                    "You consent to receive emergency-related notifications in the app.",
                    "KCERA may update these terms; major updates will be shown in-app.",
                    "For questions, contact the KCERA development team.",
                  ].map((item, index) => (
                    <Text key={index} style={styles.termItem}>
                      • {item}
                    </Text>
                  ))}
                </View>

                <Pressable
                  onPress={toggleCheckbox}
                  style={styles.checkboxContainer}
                >
                  <View
                    style={[
                      styles.checkbox,
                      accepted && styles.checkboxChecked,
                    ]}
                  >
                    {accepted && <Text style={styles.checkboxText}>✓</Text>}
                  </View>
                  <Text style={styles.checkboxLabel}>
                    I accept the terms and conditions.
                  </Text>
                </Pressable>

                <View style={styles.buttonWrapper}>
                  <Button
                    title="Continue"
                    onPress={handleContinue}
                    disabled={!accepted}
                    color="#2563eb"
                  />
                </View>

                <Text
                  onPress={() =>
                    Linking.openURL(
                      "https://www.linkedin.com/in/shem-regidor-00a991313/"
                    )
                  }
                  style={styles.linkButton}
                >
                  Contact System Developer Via LinkedIn
                </Text>

                <Text
                  onPress={() =>
                    Linking.openURL(
                      "https://www.facebook.com/shemmayo.regidor.5"
                    )
                  }
                  style={styles.linkButton}
                >
                  Contact System Developer Via Facebook
                </Text>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  modalContent: {
    flex: 1,
    width: "100%",
    padding: 20,
    backgroundColor: "transparent",
    height: "100%",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 0,
    backgroundColor: "#ffffff",
    flexGrow: 1,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  termsList: {
    marginBottom: 20,
  },
  termItem: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 10,
    lineHeight: 24,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#9ca3af",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },
  checkboxText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#111827",
  },
  buttonWrapper: {
    marginBottom: 0,
  },
  linkButton: {
    color: "#2563eb",
    textAlign: "center",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});
