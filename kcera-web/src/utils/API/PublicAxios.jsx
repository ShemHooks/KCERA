import axios from "axios";

const axiosPublicInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosPublicInstance;
