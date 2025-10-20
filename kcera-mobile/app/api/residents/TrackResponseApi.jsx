import React from "react";
import getApiClient from "../axios";

const TrackResponseApi = async (id) => {
  try {
    const api = await getApiClient();
    const response = await api.get(`emergency/response/get/specific/${id}`);

    console.log("tracking specific", response.data);

    return { success: true, data: response.data.data };
  } catch (e) {
    console.log(e);
  }
};

export default TrackResponseApi;
