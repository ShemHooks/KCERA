import axiosPrivateInstance from "./../../../utils/API/PrivateAxios";

const SystemLogsApi = async ({ keyword, date_range, is_hidden, user_role }) => {
  try {
    const response = await axiosPrivateInstance.get(
      "api/logs/admin.only/retrives.logs",
      {
        params: {
          keyword,
          date_range,
          is_hidden,
          user_role,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default SystemLogsApi;
