import React from "react";
import axiosPrivateInstance from "../../../utils/API/PrivateAxios";

const GetDriversApi = async () => {
  try {
    const response = await axiosPrivateInstance.get(
      "api/user/admin.only/list",
      {
        params: {
          role: "driver",
        },
      }
    );

    console.log("drivers", response.data.data);

    return {
      drivers: response.data.data,
    };
  } catch (error) {
    console.log(error);
  }
};

export default GetDriversApi;
