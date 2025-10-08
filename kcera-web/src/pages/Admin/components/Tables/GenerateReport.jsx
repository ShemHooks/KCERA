import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import ExportExcel from "../../../../utils/files/ExportExcel";
import { useDashboard } from "./../../DashboardContext";
import Loader from "../../../../utils/loader";

const GenerateReport = ({ onClosed }) => {
  const [date, setDate] = useState(new Date());
  const [generatedFiles, setGeneratedFiles] = useState([]); // 🔹 multiple files
  const [isLoading, setIsLoading] = useState(false);
  const { exportExcelFile } = useDashboard();

  // 🔹 Load saved files from localStorage
  useEffect(() => {
    const savedFiles = localStorage.getItem("kcera_reports");
    if (savedFiles) {
      const parsed = JSON.parse(savedFiles);
      // regenerate blob URLs from base64
      const filesWithUrls = parsed.map((file) => ({
        ...file,
        fileUrl: URL.createObjectURL(base64ToBlob(file.base64, file.type)),
      }));
      setGeneratedFiles(filesWithUrls);
    }
  }, []);

  // 🔹 Convert blob to base64 for storage
  const blobToBase64 = (blob) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(blob);
    });

  // 🔹 Convert base64 back to Blob
  const base64ToBlob = (base64, type) => {
    const byteChars = atob(base64);
    const byteNumbers = new Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
      byteNumbers[i] = byteChars.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type });
  };

  const handleGenerate = async () => {
    if (!date) {
      alert("Please select Month and Year first");
      return;
    }
    setIsLoading(true);

    const formattedDate = date.toISOString().slice(0, 7);
    const response = await exportExcelFile(formattedDate);
    const data = response.data.apiResponse.data.data;

    const blob = ExportExcel(data, formattedDate);
    const fileUrl = URL.createObjectURL(blob);
    const fileName = `KCERA_Reports_${formattedDate}.xlsx`;
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const base64 = await blobToBase64(blob);

    const newFile = { fileName, fileUrl, base64, type: fileType };

    // 🔹 Update state
    setGeneratedFiles((prev) => {
      const updated = [...prev, newFile];
      localStorage.setItem(
        "kcera_reports",
        JSON.stringify(
          updated.map(({ fileUrl, ...rest }) => rest) // exclude blob URL before saving
        )
      );
      return updated;
    });

    setIsLoading(false);
  };

  const handleDownload = (file) => {
    const a = document.createElement("a");
    a.href = file.fileUrl;
    a.download = file.fileName;
    a.click();
  };

  const handleClear = () => {
    localStorage.removeItem("kcera_reports");
    setGeneratedFiles([]);
  };

  return (
    <div>
      <div>
        <button onClick={onClosed} className="cursor-pointer">
          <ArrowBackIcon style={{ verticalAlign: "middle" }} />
        </button>
      </div>

      <div className="flex items-center gap-10 mt-4">
        <div className="flex flex-col gap-2">
          <DatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            className="p-2 text-white bg-gray-800 border border-gray-600 rounded-md"
          />
        </div>

        <button className="cursor-pointer" onClick={handleGenerate}>
          Generate
        </button>

        {generatedFiles.length > 0 && (
          <button
            className="px-3 py-1 text-sm text-red-400 border border-red-400 rounded-md hover:bg-red-500 hover:text-white"
            onClick={handleClear}
          >
            Clear All
          </button>
        )}
      </div>

      {/* 🔹 Display generated files */}
      {generatedFiles.length > 0 && (
        <div className="p-4 mt-10 rounded-lg shadow bg-black/30 backdrop-blur-sm">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Generated Reports
          </h2>

          {generatedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 mb-2 rounded hover:bg-black/40"
            >
              <p>{file.fileName}</p>
              <DownloadIcon
                className="cursor-pointer hover:text-green-400"
                onClick={() => handleDownload(file)}
              />
            </div>
          ))}
        </div>
      )}

      {isLoading && <Loader />}
    </div>
  );
};

export default GenerateReport;
