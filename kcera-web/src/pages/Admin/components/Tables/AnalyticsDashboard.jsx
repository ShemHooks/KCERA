import React, { useEffect, useState } from "react";
import SummaryCards from "./SummaryCards";
import ReportsPieChart from "./ReportsPieChart";
import MonthlyLineChart from "./MonthlyLineChart";
import TopUsers from "./TopUsers";
import GenerateReport from "./GenerateReport";
import { useDashboard } from "../../DashboardContext";

export default function AnalyticsDashboard() {
  const [buttonClicked, setButtonClick] = useState(false);

  const { loading, summary, byType, monthly, topUsers, fetchData } =
    useDashboard();

  if (loading) {
    return <div className="p-6 text-white">Loading analytics...</div>;
  }

  return (
    <div className="h-screen p-6 overflow-scroll text-white bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {!buttonClicked ? (
        <>
          <SummaryCards summary={summary} />
          <div className="mb-4">
            <div className="mb-4">
              <h1 className="font-extrabold text-gray-500">Charts</h1>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <ReportsPieChart data={byType} />
              <MonthlyLineChart data={monthly} />
            </div>
          </div>
          <TopUsers users={topUsers} />
          <div className="p-6 mt-6 mb-1 border border-gray-700 shadow-lg cursor-pointer rounded-2xl bg-black/40 backdrop-blur-md hover:border-blue-100">
            <button
              onClick={() => setButtonClick(true)}
              className="w-full cursor-pointer"
            >
              Generate Report
            </button>
          </div>
        </>
      ) : (
        <GenerateReport onClosed={() => setButtonClick(false)} />
      )}
    </div>
  );
}
