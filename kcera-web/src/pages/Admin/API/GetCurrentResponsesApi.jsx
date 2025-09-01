import axiosPrivateInstance from "./../../../utils/API/PrivateAxios";

const GetCurrentResponsesApi = async () => {
  try {
    const response = await axiosPrivateInstance.get(
      "pi/emergency/response/admin.only/ongoing"
    );

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export default GetCurrentResponsesApi;
