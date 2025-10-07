import { useState, useEffect } from "react";
import { Eye, Trash2 } from "lucide-react";
import { useDashboard } from "../../DashboardContext";
import dayjs from "dayjs";

const getDateRange = (range) => {
  const today = dayjs().endOf("day");

  switch (range) {
    case "today":
      return {
        start_date: today.format("YYYY-MM-DD"),
        end_date: today.format("YYYY-MM-DD"),
      };
    case "week":
      return {
        start_date: dayjs()
          .subtract(7, "day")
          .startOf("day")
          .format("YYYY-MM-DD"),
        end_date: today.format("YYYY-MM-DD"),
      };
    case "month":
      return {
        start_date: dayjs()
          .subtract(1, "month")
          .startOf("day")
          .format("YYYY-MM-DD"),
        end_date: today.format("YYYY-MM-DD"),
      };
    default:
      return { start_date: null, end_date: null };
  }
};

export default function SystemLogs() {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    keyword: "",
    date_range: null,
    start_date: null,
    end_date: null,
    is_hidden: false,
    user_role: "",
  });

  const { systemLogs, handleGetSystemLogs, deleteLogs } = useDashboard();

  const totalPages = Math.ceil(systemLogs.length / rowsPerPage);

  const paginatedLogs = systemLogs.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  useEffect(() => {
    handleGetSystemLogs(filters);
    setCurrentPage(1);
  }, [filters]);

  return (
    <div className="flex min-h-screen text-white bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <main className="flex-1 p-6">
        <h2 className="mb-4 text-2xl font-semibold">System Logs</h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            className="px-3 py-2 text-white rounded-md bg-slate-800"
            value={filters.date_range || ""}
            onChange={(e) => {
              const value = e.target.value;
              const range = getDateRange(value);
              setFilters({
                ...filters,
                date_range: value,
                start_date: range.start_date,
                end_date: range.end_date,
              });
            }}
          >
            <option value="">Date range</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>

          <select
            className="px-3 py-2 text-white rounded-md bg-slate-800"
            value={filters.user_role}
            onChange={(e) =>
              setFilters({ ...filters, user_role: e.target.value })
            }
          >
            <option value="">User role</option>
            <option value="admin">Administrator</option>
            <option value="drivers">Drivers</option>
            <option value="responders">Responder</option>
          </select>

          <input
            type="text"
            placeholder="Search..."
            value={filters.keyword}
            onChange={(e) =>
              setFilters({ ...filters, keyword: e.target.value })
            }
            className="px-3 py-2 text-white rounded-md bg-slate-800 w-70"
          />
        </div>

        {/* Table */}
        <div className="p-4 rounded-lg shadow bg-black/30 backdrop-blur-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-slate-800">
                <th className="py-2">Date / Time</th>
                <th>User</th>
                <th>Role</th>
                <th>Action Performed</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLogs.map((logs, idx) => (
                <tr key={idx} className="border-b border-slate-800">
                  <td className="py-2">
                    {dayjs(logs.created_at).format("MMM D, YYYY h:mm A")}
                  </td>
                  <td>{logs.users.name}</td>
                  <td>{logs.users.role}</td>
                  <td>{logs.action}</td>
                  <td className="flex justify-center gap-3 py-2">
                    <Trash2
                      className="w-4 h-4 cursor-pointer hover:text-red-400"
                      onClick={() => deleteLogs(logs.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Numbered Pagination */}
          <div className="flex flex-col items-center justify-between gap-4 mt-4 text-sm text-slate-400 md:flex-row">
            {/* Rows per page selector */}
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
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

            {/* Page controls */}
            <div className="flex items-center gap-4">
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === 1
                      ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                      : "bg-slate-800 hover:bg-slate-700"
                  }`}
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === i + 1
                        ? "bg-blue-600 hover:bg-blue-500"
                        : "bg-slate-800 hover:bg-slate-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === totalPages
                      ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                      : "bg-slate-800 hover:bg-slate-700"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
