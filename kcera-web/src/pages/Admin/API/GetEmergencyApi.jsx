import axiosPrivateInstance from "./../../../utils/API/PrivateAxios";

const GetEmergencyApi = async () => {
  try {
    const response = await axiosPrivateInstance.get("api/emergency/retrieve", {
      params: {
        status: "pending",
      },
    });

    return {
      emergencies: response.data,
    };
  } catch (error) {
    console.log(error);
  }
};

export default GetEmergencyApi;
