import { Link } from "expo-router";
import { useState } from "react";
import { Button, Image, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LoginApi from "./../../api/authApi/LoginApi";

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onPressHandler = () => {
    LoginApi(email, password);
  };

  return (
    <SafeAreaView className="items-center justify-center flex-1 bg-stone-200">
      <View className="bg-white w-[90%] h-[400px] flex flex-col items-center gap-4 pt-8 shadow-black shadow-2xl rounded-lg">
        <Image
          source={require("../../../assets/app-images/KCERA.png")}
          className="w-[100px] h-[100px]"
        />
        <Text className="font-bold">LOGIN YOUR ACCOUNT</Text>

        <TextInput
          keyboardType="email-address"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="w-[80%] border border-gray-300 pl-4"
        />

        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          className="w-[80%] border border-gray-300 pl-4"
        />

        <View className="w-[80%]">
          <Button title="Login" onPress={onPressHandler} />
        </View>

        <Text>
          Don't Have an account?
          <Link href="/screens/auth/RegistrationScreen">
            <Text className="text-blue-500"> Register</Text>
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}
