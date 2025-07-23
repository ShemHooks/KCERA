import React from "react";

import axiosPrivateInstance from "./../../../utils/API/PrivateAxios";

const GetResidentsApi = async () => {
  try {
    const response = await axiosPrivateInstance.get(
      "api/user/admin.only/list",
      {
        params: {
          role: "residents",
          approval_status: "approved",
        },
      }
    );

    if (!response.data.success) {
      return {
        users: [],
        message: response.data.message || "No user to display",
      };
    }

    return {
      users: response.data.data,
    };
  } catch (error) {
    return {
      users: [],
      message:
        error.response?.data?.message ||
        "Something went wrong. Please try again.",
    };
  }
};

export default GetResidentsApi;
