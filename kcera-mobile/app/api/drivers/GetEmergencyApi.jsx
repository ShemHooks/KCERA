import getApiClient from "../axios";

const GetEmergencyApi = async () => {
  try {
    const api = await getApiClient();
    const response = await api.get("emergency/retrieve", {
      params: { status: "verified" },
    });
    return {
      data: response.data,
    };
  } catch (error) {
    console.log(error);
  }
};

export default GetEmergencyApi;
