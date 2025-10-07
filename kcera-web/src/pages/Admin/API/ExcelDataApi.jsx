import axiosPrivateInstance from "../../../utils/API/PrivateAxios";

const ExcelDataApi = async (date) => {
  try {
    const response = await axiosPrivateInstance.get(
      "api/export-report/retrieve",
      {
        params: {
          date: date || null,
        },
      }
    );

    return {
      apiResponse: response,
    };
  } catch (e) {
    console.log(e);
  }
};

export default ExcelDataApi;
