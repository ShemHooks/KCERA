import axiosPrivateInstance from "./../../../utils/API/PrivateAxios";

const GetCurrentResponsesApi = async () => {
  try {
    const response = await axiosPrivateInstance.get(
      "api/emergency/response/admin.only/ongoing"
    );

    return {
      data: response.data,
    };
  } catch (error) {
    console.log(error);
  }
};

export default GetCurrentResponsesApi;
