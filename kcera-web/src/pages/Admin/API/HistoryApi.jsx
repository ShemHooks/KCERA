import axiosPrivateInstance from "./../../../utils/API/PrivateAxios";

const HistoryApi = async (keyword) => {
  try {
    const response = await axiosPrivateInstance.get("api/history/get", {
      params: {
        keyword: keyword || null,
      },
    });

    return {
      responses: response.data.data?.responses,
      reports: response.data.data?.reports,
    };
  } catch (err) {
    console.log(err);
  }
};

export default HistoryApi;
