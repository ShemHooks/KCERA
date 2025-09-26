import React from "react";
import LogoutApi from "../../API/LogoutApi";
import { Navigate, useNavigate } from "react-router-dom";

const AdminAccountSetting = () => {
  const navigate = new useNavigate();

  const logout = async () => {
    await LogoutApi();
    navigate("/");
  };

  return (
    <div className="p-6">
      <button className="cursor-pointer" onClick={logout}>
        {" "}
        Logout
      </button>
    </div>
  );
};

export default AdminAccountSetting;
