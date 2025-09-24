import { useState } from "react";
import { TablePagination } from "@mui/material";
import { GetDocTitle } from "../../../../utils/hooks/useDocumentTitle";

const DriversTable = ({ drivers }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Slice data for current page
  const paginatedDrivers = drivers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <div className="flex min-h-screen text-white bg-slate-950">
        <main className="flex-1 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Drivers</h2>
          <GetDocTitle title="KCERA: List of Drivers" />

          {/* Filters + Search */}
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
          <div className="p-4 rounded-lg shadow bg-slate-900">
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
                {paginatedDrivers.map((driver) => (
                  <tr key={driver.id} className="border-b border-slate-800">
                    <td className="py-2">{driver.name}</td>
                    <td>{driver.email}</td>
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

            {/* Pagination */}
            <div className="flex justify-end mt-4">
              <TablePagination
                component="div"
                count={drivers.length}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0); // reset to first page
                }}
                rowsPerPageOptions={[5, 10, 25, 50]}
                sx={{
                  color: "white",
                  "& .MuiTablePagination-actions button": { color: "white" },
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default DriversTable;
