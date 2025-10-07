// utils/files/ExportExcel.js
import * as XLSX from "xlsx";

const ExportExcel = (data, date) => {
  const workBook = XLSX.utils.book_new();

  const flattenReports = data.reports.map((report) => ({
    id: report.id,
    reporter: report.reporter,
    incident: report.incident,
    street: report.location?.street || "",
    city: report.location?.city || "",
    state: report.location?.state || "",
    country: report.location?.country || "",
    date: report.date,
  }));

  const flattenResponses = data.responses.map((response) => ({
    id: response.id,
    emergency_id: response["emergency id"],
    responder: response.responder,
    date: response.date,
  }));

  const requestsSheet = XLSX.utils.json_to_sheet(flattenReports);
  XLSX.utils.book_append_sheet(workBook, requestsSheet, "Emergency Requests");

  const responsesSheet = XLSX.utils.json_to_sheet(flattenResponses);
  XLSX.utils.book_append_sheet(workBook, responsesSheet, "Emergency Responses");

  const excelBuffer = XLSX.write(workBook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  return blob; // 🔹 Return instead of saving
};

export default ExportExcel;
