import axiosPrivateInstance from "../../../utils/API/PrivateAxios";

export const getSummary = () =>
  axiosPrivateInstance.get("api/analytics/summary");
export const getByType = (date) =>
  axiosPrivateInstance.get("api/analytics/by-type", {
    params: {
      date: date || null,
    },
  });
export const getMonthly = () =>
  axiosPrivateInstance.get("api/analytics/monthly");
export const getTopUsers = () =>
  axiosPrivateInstance.get("api/analytics/top-user");
