import axios from "axios";

const token = localStorage.getItem("token");

const axiosPrivateInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
    Accept: "application/json",
  },
});

export default axiosPrivateInstance;
