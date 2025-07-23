import React from "react";
import axiosPrivateInstance from "../../../utils/API/PrivateAxios";

const GetRespondersApi = async () => {
  try {
    const response = await axiosPrivateInstance.get(
      "api/user/admin.only/list",
      {
        params: {
          role: "responder",
        },
      }
    );

    console.log("responders", response.data.data);

    return {
      responders: response.data.data,
    };
  } catch (error) {
    console.log(error);
  }
};

export default GetRespondersApi;
