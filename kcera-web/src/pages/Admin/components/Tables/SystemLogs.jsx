import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";

export default function SystemLogs() {
  const [logs] = useState([
    {
      date: "10/06, 9:01 AM",
      user: "jdoe",
      role: "Administrator",
      action: "User login",
      status: "Success",
    },
    {
      date: "10/06, 6:58 AM",
      user: "asmith",
      role: "Driver",
      action: "Data export",
      status: "Failed",
    },
    {
      date: "10/06, 2:19 PM",
      user: "bwilliams",
      role: "Resident",
      action: "System update",
      status: "Pending",
    },
    {
      date: "10/06, 2:38 AM",
      user: "morgam1",
      role: "Responder",
      action: "Incident response",
      status: "Success",
    },
    {
      date: "10/06, 5:08 AM",
      user: "bwilliams",
      role: "Resident",
      action: "Configuration change",
      status: "Failed",
    },
    {
      date: "10/06, 6:24 PM",
      user: "bwilliams",
      role: "Responder",
      action: "Active operator",
      status: "Pending",
    },
    // Add more sample logs for testing
  ]);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(logs.length / rowsPerPage);

  const paginatedLogs = logs.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // reset to first page when rows change
  };

  return (
    <div className="flex min-h-screen text-white bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <main className="flex-1 p-6">
        <h2 className="mb-4 text-2xl font-semibold">System Logs</h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select className="px-3 py-2 text-white rounded-md bg-slate-800">
            <option>Date range</option>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
          <select className="px-3 py-2 text-white rounded-md bg-slate-800">
            <option>User role</option>
            <option>Administrator</option>
            <option>Supervisor</option>
            <option>Responder</option>
          </select>
          <select className="px-3 py-2 text-white rounded-md bg-slate-800">
            <option>Action type</option>
            <option>User Login</option>
            <option>Data Export</option>
            <option>System Update</option>
          </select>
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 text-white rounded-md bg-slate-800 w-60"
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
              {paginatedLogs.map((log, idx) => (
                <tr key={idx} className="border-b border-slate-800">
                  <td className="py-2">{log.date}</td>
                  <td>{log.user}</td>
                  <td>{log.role}</td>
                  <td>{log.action}</td>
                  <td className="flex justify-center gap-3 py-2">
                    <Eye className="w-4 h-4 cursor-pointer hover:text-blue-400" />
                    <Trash2 className="w-4 h-4 cursor-pointer hover:text-red-400" />
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
