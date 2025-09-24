import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  TablePagination,
} from "@mui/material";
import { useState } from "react";
import { GetDocTitle } from "../../../../utils/hooks/useDocumentTitle";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "90%",
  maxHeight: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1,
  outline: "none",
};

const PendingAccounts = ({ users, approvePending, declinePending }) => {
  const [open, setOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const handleImageClick = (src) => {
    setModalImage(src);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Paginated users
  const paginatedUsers = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <div className="flex min-h-screen text-white bg-slate-950">
        <main className="flex-1 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Pending Accounts</h2>
          <GetDocTitle title="KCERA: Pending Accounts" />

          <div className="p-4 rounded-lg shadow bg-slate-900">
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
            {/* Pagination */}
            <div className="flex justify-end mt-4">
              <TablePagination
                component="div"
                count={users.length}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
                sx={{
                  color: "white",
                  "& .MuiTablePagination-actions button": { color: "white" },
                }}
              />
            </div>

            {/* Modal */}
            <Modal open={open} onClose={handleClose}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "#0f172a",
                  borderRadius: "0.5rem",
                  boxShadow: 24,
                  p: 2,
                }}
              >
                <img
                  src={modalImage}
                  alt="Zoomed"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "80vh",
                    borderRadius: "0.5rem",
                  }}
                />
              </Box>
            </Modal>
          </div>
        </main>
      </div>
    </>
  );
};

export default PendingAccounts;
