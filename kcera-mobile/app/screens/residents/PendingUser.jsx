import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ROUTES from "../../constant/routes";

const PendingUser = () => {
  const backToLogin = () => {
    router.replace(ROUTES.AUTH.LOGIN);
  };

  return (
    <SafeAreaView className="items-center justify-center flex-1 bg-stone-100">
      <View className="bg-stone-200 h-[300px] w-[300px] rounded-lg p-4 justify-center shadow-lg">
        <View className="flex items-center w-full">
          <Image
            source={require("../../../assets/app-images/KCERA.png")}
            className="w-[100px] h-[100px]"
          />
        </View>
        <Text className="mb-2 text-lg font-semibold text-center">
          Dear Kabankalanon,
        </Text>

        <Text className="mb-1 text-center">
          Your account has not yet been validated by the system administrator.
        </Text>

        <Text className="mb-1 text-center">
          Please wait while we review your registration. You will be notified
          once your account is approved.
        </Text>

        <Text className="mb-4 text-center text-red-500">
          We apologize for any inconvenience this may have caused.
        </Text>

        <View className="items-center">
          <TouchableOpacity
            className="px-4 py-2 bg-blue-500 rounded"
            onPress={backToLogin}
          >
            <Text className="text-white">Back to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PendingUser;
