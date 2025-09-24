import { useState } from "react";
import { GetDocTitle } from "../../../../utils/hooks/useDocumentTitle";

const PendingAccounts = ({ users, approvePending, declinePending }) => {
  const [open, setOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const handleImageClick = (src) => {
    setModalImage(src);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / rowsPerPage);

  const paginatedUsers = users.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <>
      <div className="flex min-h-screen text-white bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <main className="flex-1 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Pending Accounts</h2>
          <GetDocTitle title="KCERA: Pending Accounts" />

          <div className="p-4 rounded-lg shadow bg-black/30 backdrop-blur-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-slate-800">
                  <th className="py-2">Fullname</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Front ID</th>
                  <th>Back ID</th>
                  <th>Face Photo</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="border-b border-slate-800">
                    <td className="py-2">{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>
                      <img
                        src={user.front_id_photo}
                        alt="Front ID"
                        className="w-16 rounded cursor-pointer hover:opacity-80"
                        onClick={() => handleImageClick(user.front_id_photo)}
                      />
                    </td>
                    <td>
                      <img
                        src={user.back_id_photo}
                        alt="Back ID"
                        className="w-16 rounded cursor-pointer hover:opacity-80"
                        onClick={() => handleImageClick(user.back_id_photo)}
                      />
                    </td>
                    <td>
                      <img
                        src={user.face_photo}
                        alt="Face Photo"
                        className="w-16 rounded cursor-pointer hover:opacity-80"
                        onClick={() => handleImageClick(user.face_photo)}
                      />
                    </td>
                    <td>
                      <div className="flex flex-col items-center gap-2">
                        <button
                          onClick={() => approvePending(user.id)}
                          className="w-full px-3 py-1 text-sm text-white transition bg-green-600 rounded-md hover:bg-green-500"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => declinePending(user.id)}
                          className="w-full px-3 py-1 text-sm text-red-400 transition border border-red-500 rounded-md hover:bg-red-500 hover:text-white"
                        >
                          Decline
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Custom Pagination (same as SystemLogs) */}
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

          {/* Modal */}
          {open && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70"
              onClick={handleClose}
            >
              <div
                className="p-2 rounded-lg bg-slate-900"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={modalImage}
                  alt="Zoomed"
                  className="max-w-full max-h-[80vh] rounded-lg"
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default PendingAccounts;
