import getApiClient from "../axios";

const NotificationApi = async () => {
  try {
    const api = await getApiClient();
    const response = await api.get("notification/get");

    console.log("api response for notification", response.data);

    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export default NotificationApi;
