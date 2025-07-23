import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import RejectReport from "../../../../../unneeded/services/RejectReport";
import VerifyReport from "../../../../../unneeded/services/VerifyReport";

const RequestDetails = ({ details, onClose }) => {
  console.log("request details", details);
  const [isLoading, setIsLoading] = useState(false);

  const reporterName = details.requester.name;
  const reporterGender = details.requester.gender;
  const reporterPhoneNumber = details.requester.phone;
  const reporterEmail = details.requester.email;
  const reporterAddress = details.requester.address;

  const reportId = details.id;
  const reportedIncident = details.request_type;
  const reportPhoto = details.request_photo;
  const rawReportDateTime = details.request_date;
  const formattedReportDateTime = new Date(rawReportDateTime).toLocaleString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }
  );

  const rejectRequest = async () => {
    setIsLoading(true);
    try {
      await RejectReport(reportId);

      alert("Successfully Reject Report");
      onClose();
    } catch (err) {
      console.log(err);
      alert("Failed to reject the report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const VerifyRequest = async () => {
    setIsLoading(true);
    try {
      await VerifyReport(reportId);
      alert("Successfully Verified Report");
      onClose();
    } catch (err) {
      alert("Failed to verify the report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-end pr-10 mt-6">
        <button onClick={onClose} className="cursor-pointer">
          <FaTimes className="text-white hover:text-red-500  w-6 h-6  rounded-2xl" />
        </button>
      </div>
      <h1 className="text-center font-bold">VERIFY REQUEST</h1>
      <br />
      <br />
      <div className="pl-10 flex flex-col gap-4">
        <h1 className="font-bold">Reporter Details</h1>
        <div className="pl-6 flex flex-col gap-4">
          <div className="flex gap-2">
            Name: <h1>{reporterName}</h1>
          </div>
          <div className="flex gap-2">
            Gender: <h1 className="capitalize">{reporterGender}</h1>
          </div>
          <div className="flex gap-2">
            Phone: <h1>{reporterPhoneNumber}</h1>
          </div>
          <div className="flex gap-2">
            Email: <h1>{reporterEmail}</h1>
          </div>
          <div className="flex gap-2">
            Address: <h1>{reporterAddress}</h1>
          </div>
        </div>

        <h1>Request Details</h1>
        <div className="pl-6 flex flex-col gap-4">
          <div className="flex gap-2">
            Date & Time: <h1>{formattedReportDateTime}</h1>
          </div>
          <div className="flex gap-2">
            Type of Incident: <h1 className="capitalize">{reportedIncident}</h1>
          </div>
          <div>
            Image:
            <div className="pl-12">
              <img
                src={reportPhoto}
                alt="There is no preview of an image"
                className="rounded"
              />
            </div>
            <div className="flex gap-10 justify-end pr-10 mt-10 mb-10">
              <button
                className="border rounded p-2 cursor-pointer w-20 h-10 transform hover:scale-110 transition-transform duration-300"
                onClick={rejectRequest}
              >
                {isLoading ? "Rejecting" : "Reject"}
              </button>
              <button
                className="border  rounded p-2 cursor-pointer w-20 h-10 transform hover:scale-110 transition-transform duration-300"
                onClick={VerifyRequest}
              >
                {isLoading ? "Verifying" : "Verify"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
