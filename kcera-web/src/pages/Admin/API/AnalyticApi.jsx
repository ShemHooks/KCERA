import axiosPrivateInstance from "../../../utils/API/PrivateAxios";

export const getSummary = () =>
  axiosPrivateInstance.get("api/analytics/summary");
export const getByType = () =>
  axiosPrivateInstance.get("api/analytics/by-type");
export const getMonthly = () =>
  axiosPrivateInstance.get("api/analytics/monthly");
export const getTopUsers = () =>
  axiosPrivateInstance.get("api/analytics/top-user");
