import React from "react";
import axiosPrivateInstance from "../../../utils/API/PrivateAxios";

const CreateNewAccount = async (name, email, address, role, gender, phone) => {
  try {
    const response = await axiosPrivateInstance.post(
      "api/user/admin.only/register/staff ",
      {
        name,
        email,
        gender,
        role,
        address,
        phone,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating new account:", error);
    throw error;
  }
};

export default CreateNewAccount;
