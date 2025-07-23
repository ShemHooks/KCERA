import React, { useEffect, useState } from "react";
import RequesterDetails from "../../Drivers/services/RequesterDetails";
import PatientCareReport from "./PatientCareReport";

const ResponseDetails = ({ details }) => {
  const [requesterId, setRequesterId] = useState(null);

  useEffect(() => {
    if (details) {
      setRequesterId(details.alert_request.user_id);
    }
  }, [details]);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {requesterId ? (
        <div className=" bg-black/20 h-screen w-screen flex justify-center items-center ">
          <div className=" flex flex-col  shadow-2xl  rounded-2xl bg-white ">
            <h1 className="text-center uppercase font-semibold border-b-2 border-gray-300 p-2">
              Requested From
            </h1>
            <div className="px-10 py-5">
              <RequesterDetails userId={requesterId} />
              <PatientCareReport details={details} />
            </div>
          </div>
        </div>
      ) : (
        <div>No Task Yet</div>
      )}
    </div>
  );
};

export default ResponseDetails;
