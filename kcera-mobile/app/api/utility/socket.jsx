import { io } from "socket.io-client";
import Constants from "expo-constants";

const getHostUri = () => {
  return (
    Constants.expoConfig?.hostUri ||
    Constants.expoConfig?.extra?.expoClient?.hostUri ||
    Constants.manifest2?.extra?.expoClient?.hostUri
  );
};

const hostUri = getHostUri();

console.log("host URI", hostUri);

if (!hostUri) {
  throw new Error("Could not determine host IP. Make sure Expo is running.");
}

const ip = hostUri.split(":")[0];
const baseURL = `http://${ip}:8080`;

const socket = io(baseURL, {
  transports: ["websocket"],
});

export default socket;
