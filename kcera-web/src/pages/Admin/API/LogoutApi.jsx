import React from "react";
import axiosPrivateInstance from "../../../utils/API/PrivateAxios";

const logoutApi = async () => {
  try {
    await axiosPrivateInstance.post("api/user/logout");
  } catch (error) {
    console.log(error);
  } finally {
    localStorage.clear();
  }
};

export default logoutApi;
