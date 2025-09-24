import React, { useState, useMemo } from "react";
import { GetDocTitle } from "../../../../utils/hooks/useDocumentTitle";

// Sample data
const reports = [
  {
    id: 101,
    reporter: "Jane Doe",
    type: "Fire",
    location: "Barangay 5, Kabankalan",
    status: "Resolved",
    response_id: 2001,
    created_at: "2025-09-22 08:45 AM",
  },
  {
    id: 102,
    reporter: "John Smith",
    type: "Medical Emergency",
    location: "Barangay 9, Kabankalan",
    status: "Resolved",
    response_id: 2002,
    created_at: "2025-09-23 02:15 PM",
  },
  {
    id: 103,
    reporter: "Maria Cruz",
    type: "Flood",
    location: "Barangay 2, Kabankalan",
    status: "Resolved",
    response_id: null,
    created_at: "2025-09-24 06:30 AM",
  },
];

const responses = [
  {
    id: 2001,
    responder: "Team Alpha",
    report_id: 101,
    status: "Resolved",
    created_at: "2025-09-22 09:15 AM",
  },
  {
    id: 2002,
    responder: "Medic Unit 3",
    report_id: 102,
    status: "Resolved",
    created_at: "2025-09-23 02:45 PM",
  },
];

export default function Histories() {
  const [viewType, setViewType] = useState("reports");
  const [sortBy, setSortBy] = useState("date-desc");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // Pick data based on type
  const data = viewType === "reports" ? reports : responses;

  // Filter + Sort
  const processedData = useMemo(() => {
    let items = [...data];

    if (filterStatus !== "all") {
      items = items.filter((item) =>
        viewType === "reports"
          ? item.status === filterStatus
          : item.status === filterStatus
      );
    }

    if (sortBy === "date-desc") {
      items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortBy === "date-asc") {
      items.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }

    return items;
  }, [data, sortBy, filterStatus, viewType]);

  // Pagination
  const totalPages = Math.ceil(processedData.length / rowsPerPage);
  const paginatedData = processedData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

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
                        Report #{item.id}: {item.type}
                      </p>
                      <p className="text-xs text-slate-400">
                        Reported by {item.reporter} • {item.location}
                      </p>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {item.created_at}
                  </p>
                </div>
              ) : (
                <div key={item.id} className="py-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">
                        Response #{item.id} for Report #{item.report_id}
                      </p>
                      <p className="text-xs text-slate-400">
                        Handled by {item.responder}
                      </p>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {item.created_at}
                  </p>
                </div>
              )
            )}
          </div>

          <div className="flex flex-col items-center justify-between gap-4 pt-4 mt-4 text-sm text-slate-400 md:flex-row border-t-1 border-slate-800">
            <span>
              Page {page} of {totalPages || 1}
            </span>
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
                disabled={page === totalPages}
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
