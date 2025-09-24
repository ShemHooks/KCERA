import { useState } from "react";
import { GetDocTitle } from "../../../../utils/hooks/useDocumentTitle";

const DriversTable = ({ drivers }) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(drivers.length / rowsPerPage);

  const paginatedDrivers = drivers.slice(
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
        <h2 className="mb-4 text-2xl font-semibold">Drivers</h2>
        <GetDocTitle title="KCERA: List of Drivers" />

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select className="px-3 py-2 text-white rounded-md bg-slate-800">
            <option>Status</option>
            <option>Online</option>
            <option>Offline</option>
          </select>

          <select className="px-3 py-2 text-white rounded-md bg-slate-800">
            <option>Sort by</option>
            <option>Name (A-Z)</option>
            <option>Name (Z-A)</option>
            <option>Email</option>
          </select>

          <input
            type="text"
            placeholder="Search driver..."
            className="px-3 py-2 text-white rounded-md bg-slate-800 w-60"
          />
        </div>

        {/* Table */}
        <div className="p-4 rounded-lg shadow bg-black/30 backdrop-blur-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-slate-800">
                <th className="w-1/4 py-2">Fullname</th>
                <th className="w-1/4">Email</th>
                <th className="w-1/4">Contact</th>
                <th className="w-1/4">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDrivers.map((driver, index) => (
                <tr
                  key={driver.id || index}
                  className="border-b border-slate-800"
                >
                  <td className="py-2">{driver.name}</td>
                  <td className="max-w-xs truncate" title={driver.email}>
                    {driver.email}
                  </td>
                  <td>{driver.phone}</td>
                  <td>
                    {driver.status === "active" ? (
                      <span className="px-2 py-1 text-xs font-medium text-green-300 bg-green-900 rounded-full">
                        Online
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium text-red-300 bg-red-900 rounded-full">
                        Offline
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Custom Pagination (same as RespondersTable) */}
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
                Page {currentPage} of {totalPages || 1}
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
                    currentPage === totalPages || totalPages === 0
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
};

export default DriversTable;
