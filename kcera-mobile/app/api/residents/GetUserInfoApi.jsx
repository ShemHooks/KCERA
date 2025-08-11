import React from "react";
import getApiClient from "../axios";

const GetUserInfoApi = async () => {
  try {
    const api = await getApiClient();
    const response = await api.get("user/info");

    if (response.status !== 200) {
      console.log("error retrieving data");
      return;
    }

    return {
      user: response.data,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default GetUserInfoApi;
