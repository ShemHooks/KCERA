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
} from "react-native";

export default function TermCondition() {
  const [visible, setVisible] = useState(true);
  const [accepted, setAccepted] = useState(false);

  const handleContinue = () => {
    if (accepted) setVisible(false);
  };

  const toggleCheckbox = () => setAccepted(!accepted);

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <ScrollView>
        <View className="items-center justify-center flex-1 px-4 bg-white ">
          <View
            className="bg-white rounded w-full max-w-md max-h-[100%] shadow-lg shadow-black"
            style={Styles.view}
          >
            <View className="flex items-center w-full">
              <Image
                source={require("../../../assets/app-images/KCERA.png")}
                className="w-[100px] h-[100px]"
              />
            </View>
            <Text
              className="w-full mb-3 font-bold text-center"
              style={Styles.title}
            >
              Terms & Conditions
            </Text>

            <ScrollView className="mb-4" showsVerticalScrollIndicator={true}>
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
                <Text
                  key={index}
                  className="mb-2 leading-relaxed text-gray-700"
                  style={Styles.text}
                >
                  • {item}
                </Text>
              ))}
            </ScrollView>

            {/* Custom Checkbox */}
            <Pressable
              onPress={toggleCheckbox}
              className="flex-row items-center px-1 mb-4"
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  borderWidth: 2,
                  marginRight: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: accepted ? "#2563eb" : "white",
                  borderColor: accepted ? "#2563eb" : "#9ca3af",
                }}
              >
                {accepted && (
                  <Text className="text-xs font-bold text-white">✓</Text>
                )}
              </View>

              <Text style={Styles.text}>
                I accept the terms and conditions.
              </Text>
            </Pressable>

            <View className="px-1 mt-4">
              <Text></Text>
              <Button
                title="Continue"
                onPress={handleContinue}
                disabled={!accepted}
                color="#2563eb"
              />
            </View>

            <View>
              <Text
                onPress={() =>
                  Linking.openURL(
                    "https://www.linkedin.com/in/shem-regidor-00a991313/"
                  )
                }
                style={Styles.linkButton}
              >
                Contact System Developer Via LinkedIn
              </Text>

              <Text
                onPress={() =>
                  Linking.openURL("https://www.facebook.com/shemmayo.regidor.5")
                }
                style={Styles.linkButton}
              >
                Contact System Developer Via Facebook
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}

const Styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 30,
    marginBottom: 10,
  },

  view: {
    padding: 10,
    elevation: 5,
    borderRadius: 8,
  },

  linkButton: {
    textAlign: "center",
    color: "blue",
    backgroundColor: "transparent",
    marginTop: 6,
  },

  text: {
    fontSize: 18,
  },
});
