import React, { useState, useMemo, useEffect } from "react";
import { GetDocTitle } from "../../../../utils/hooks/useDocumentTitle";
import { useDashboard } from "../../DashboardContext";

export default function Histories() {
  const [keyword, setKeyword] = useState("");
  const [viewType, setViewType] = useState("reports");
  const [sortBy, setSortBy] = useState("date-desc");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); // <-- now dynamic

  const { responseHistory, reportHistory, handleGetHistory } = useDashboard();

  // Helper to format datetime
  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Pick data based on type
  const data = viewType === "reports" ? reportHistory : responseHistory;

  // Filter + Sort
  const processedData = useMemo(() => {
    let items = [...data];

    if (filterStatus !== "all") {
      items = items.filter((item) => item.status === filterStatus);
    }

    if (sortBy === "date-desc") {
      items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortBy === "date-asc") {
      items.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }

    return items;
  }, [data, sortBy, filterStatus]);

  // Pagination
  const totalPages = Math.ceil(processedData.length / rowsPerPage);
  const paginatedData = processedData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  useEffect(() => {
    handleGetHistory(keyword);
    setPage(1);
  }, [keyword]);

  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1); // reset page when rows per page changes
  };

  return (
    <div className="flex min-h-screen text-white bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <main className="flex-1 p-6">
        <h2 className="mb-4 text-2xl font-semibold">
          {viewType === "reports" ? "Report Histories" : "Response Histories"}
        </h2>
        <GetDocTitle title="KCERA: Histories" />

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={viewType}
            onChange={(e) => {
              setViewType(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 text-white rounded-md bg-slate-800"
          >
            <option value="reports">Reports</option>
            <option value="responses">Responses</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-white rounded-md bg-slate-800"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
          </select>

          <input
            type="text"
            placeholder="Search..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="px-3 py-2 text-white rounded-md bg-slate-800 w-70"
          />
        </div>

        {/* Data List */}
        <div className="p-4 rounded-lg shadow bg-black/30 backdrop-blur-sm">
          <div className="divide-y divide-slate-800">
            {paginatedData.map((item) =>
              viewType === "reports" ? (
                <div key={item.id} className="py-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">
                        Report #{item.id}: {item.request_type}
                      </p>
                      <p className="text-xs text-slate-400">
                        Reported by {item.user.name} • Coordinates{" "}
                        {item.latitude.toFixed(5)}, {item.longitude.toFixed(5)}
                      </p>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {formatDateTime(item.created_at)}
                  </p>
                </div>
              ) : (
                <div key={item.id} className="py-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">
                        Response #{item.id} for Report #{item.request_id}
                      </p>
                      <p className="text-xs text-slate-400">
                        Handled by {item.driver.name} • Coordinates{" "}
                        {item.report.latitude.toFixed(5)},{" "}
                        {item.report.longitude.toFixed(5)}
                      </p>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {formatDateTime(item.created_at)}
                  </p>
                </div>
              )
            )}
          </div>

          {/* Pagination */}
          <div className="flex flex-col items-center justify-between gap-4 pt-4 mt-4 text-sm border-t text-slate-400 md:flex-row border-slate-800">
            <div className="flex items-center gap-4">
              <span>
                Page {page} of {totalPages || 1}
              </span>
              <div className="flex items-center gap-2 ">
                <select
                  value={rowsPerPage}
                  onChange={handleRowsChange}
                  className="px-2 py-1 text-white rounded-md bg-slate-800"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className={`px-3 py-1 rounded-md ${
                  page === 1
                    ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded-md ${
                    page === i + 1
                      ? "bg-blue-600 hover:bg-blue-500"
                      : "bg-slate-800 hover:bg-slate-700"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages || totalPages === 0}
                className={`px-3 py-1 rounded-md ${
                  page === totalPages || totalPages === 0
                    ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
