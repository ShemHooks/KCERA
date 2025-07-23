import { Emergency } from "@mui/icons-material";
import React from "react";

const GetEmergencyRequest = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/requests");
    const data = await response.json();

    if (response.ok) {
      return {
        emergency: data.data,
      };
    }
  } catch (e) {
    return {
      error: "unable to fetch emergencies",
    };
  }
};

export default GetEmergencyRequest;
