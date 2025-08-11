import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RegistrationApi from "../../api/authApi/RegistrationApi";
import Camera from "../../components/Registration/Camera";
import RegistrationConfirmation from "../../components/Registration/RegistrationConfirmation";
import TermCondition from "../../components/Registration/TermCondition";
import UserData from "../../components/Registration/UserData";

const Stepper = ({ steps, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <SafeAreaView>
      <TermCondition />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex items-center w-full">
          <Image
            source={require("../../../assets/app-images/KCERA.png")}
            className="w-[100px] h-[100px]"
          />
        </View>

        <View className="flex-row justify-center mb-5">
          {steps.map((step, index) => (
            <View
              key={index}
              className={`w-8 h-8 rounded-full mx-1 items-center justify-center ${
                index === currentStep ? "bg-green-600" : "bg-gray-300"
              }`}
            >
              <Text
                className={`${
                  index === currentStep
                    ? "text-white font-bold"
                    : "text-gray-700"
                }`}
              >
                {index + 1}
              </Text>
            </View>
          ))}
        </View>

        {/* Step Content */}
        <View className="p-2 mb-5">
          <Text className="text-xl font-bold ">{steps[currentStep].title}</Text>
          <View className="text-base">{steps[currentStep].content}</View>
        </View>

        {/* Navigation Buttons */}
        <View className="flex-row justify-between">
          <TouchableOpacity
            onPress={prevStep}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded ${
              currentStep === 0 ? "bg-gray-400" : "bg-green-600"
            }`}
          >
            <Text className="text-white">Back</Text>
          </TouchableOpacity>

          {currentStep === steps.length - 1 ? (
            <TouchableOpacity
              onPress={onSubmit}
              className="px-4 py-2 bg-blue-600 rounded"
            >
              <Text className="text-white">Register</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={nextStep}
              className="px-4 py-2 bg-green-600 rounded"
            >
              <Text className="text-white">Next</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default function RegistrationScreen() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
    gender: "",
    frontImage: null,
    backImage: null,
    facePhoto: null,
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    RegistrationApi(formData);
  };

  const steps = [
    {
      title: "User Information",
      content: <UserData formData={formData} updateField={updateField} />,
    },
    {
      title: "Facial Photo",
      content: (
        <Camera
          image={formData.facePhoto}
          setImage={(uri) => updateField("facePhoto", uri)}
        />
      ),
    },
    {
      title: "",
      content: <RegistrationConfirmation formData={formData} />,
    },
  ];

  return <Stepper steps={steps} onSubmit={handleSubmit} />;
}
