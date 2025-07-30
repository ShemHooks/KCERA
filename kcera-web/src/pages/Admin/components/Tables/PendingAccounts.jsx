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

  return (
    <>
      <h1 className="mt-6 ml-10 text-3xl">Pending Accounts</h1>
      <GetDocTitle title="KCERA: Pending Accounts" />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fullname</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Front ID</TableCell>
              <TableCell>Back ID</TableCell>
              <TableCell>Face Photo</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>
                  <img
                    src={user.front_id_photo}
                    alt="Front ID"
                    style={{ width: 60, cursor: "pointer" }}
                    onClick={() => handleImageClick(user.front_id_photo)}
                  />
                </TableCell>
                <TableCell>
                  <img
                    src={user.back_id_photo}
                    alt="Back ID"
                    style={{ width: 60, cursor: "pointer" }}
                    onClick={() => handleImageClick(user.back_id_photo)}
                  />
                </TableCell>
                <TableCell>
                  <img
                    src={user.face_photo}
                    alt="Face Photo"
                    style={{ width: 60, cursor: "pointer" }}
                    onClick={() => handleImageClick(user.face_photo)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex-col w-full h-full gap-4">
                    <Button
                      variant="contained"
                      onClick={() => approvePending(user.id)}
                      className="w-full mb-6"
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => declinePending(user.id)}
                      className="w-full"
                    >
                      Decline
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <img
            src={modalImage}
            alt="Zoomed"
            style={{ maxWidth: "100%", maxHeight: "80vh" }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default PendingAccounts;
