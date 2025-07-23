import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SendRequest from "../services/SendRequest";
import DuplicateMessage from "./DuplicateMessage";
import { useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const image = location.state?.image;
  const reporter = localStorage.getItem("fullName");
  const pinnedLocation = localStorage.getItem("emergency Location");
  const emergencyType = localStorage.getItem("emergencyTYpe");
  const [pinnedLat, pinnedLong] = pinnedLocation.split(",").map(Number);
  const [street, setStreet] = useState("");
  const userId = localStorage.getItem("userID");
  const requestStatus = "pending";
  const date = new Date();

  const [errorMsg, setErrorMsg] = useState("");

  const getStreetFromCoords = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      return data.display_name || "Unknown Address";
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    if (pinnedLat && pinnedLong) {
      getStreetFromCoords(pinnedLat, pinnedLong).then((streetName) => {
        console.log("Ari kadi sa ", streetName);
        setStreet(streetName);
      });
    }
  }, [pinnedLat, pinnedLong]);

  const formatDateLocal = (date) => {
    const pad = (n) => String(n).padStart(2, "0");
    return (
      `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
      `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
    );
  };

  const handleConfirm = async () => {
    const requestDate = formatDateLocal(date);
    try {
      const response = await SendRequest(
        userId,
        emergencyType,
        requestStatus,
        requestDate,
        pinnedLong,
        pinnedLat,
        image
      );
      if (
        !response ||
        typeof response !== "object" ||
        !("success" in response)
      ) {
        setErrorMsg("Something went wrong. Invalid response from server.");
        return;
      }

      if (!response.success) {
        setErrorMsg(response.message || "Request failed without a message.");
        return;
      }

      navigate("/resident/dashboard");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const cancelHandler = () => {
    localStorage.removeItem("emergency Location");
    localStorage.removeItem("emergencyTYpe");
    navigate("/resident/dashboard");
  };

  return (
    <>
      <div>
        <div className="flex flex-col gap-8 pl-4">
          <div className="flex justify-center">
            <img
              src="/images/KCERA.png"
              alt=""
              className="w-[100px] lg:w-[200px]"
            />
          </div>

          <div className="text-center">
            <h1 className="font-bold">Confirm Emergency Details</h1>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <span className="font-bold">Reporter: </span>
              <h2>{reporter}</h2>
            </div>
            <div className="flex gap-2">
              <span className="font-bold">Location/Street: </span>
              <h2>{street}</h2>
            </div>
            <div className="flex gap-2">
              <span className="font-bold">Type: </span>
              <h2>{emergencyType}</h2>
            </div>

            <div className="flex flex-col gap-2 lg:w-1/4">
              <span className="font-bold">Photo: </span>
              <img
                src={image}
                alt="Your Captured Photo"
                className="mr-4 lg:ml-20 rounded w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <button
                className="bg-blue-300 mr-4 h-[50px] font-bold cursor-pointer"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
            {errorMsg && (
              <DuplicateMessage message={errorMsg} onCancel={cancelHandler} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationPage;
