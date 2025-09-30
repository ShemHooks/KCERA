import axiosPrivateInstance from "../../../utils/API/PrivateAxios";

const SystemLogsApi = async (filters = {}) => {
  try {
    const response = await axiosPrivateInstance.get(
      "api/logs/admin.only/retrives.logs",
      {
        params: {
          keyword: filters.keyword || null,
          date_range:
            filters.start_date && filters.end_date
              ? [filters.start_date, filters.end_date]
              : null,
          is_hidden: filters.is_hidden ?? null,
          user_role: filters.user_role || null,
        },
      }
    );
    return response.data; // sendResponse wrapper
  } catch (error) {
    throw error;
  }
};

export default SystemLogsApi;
