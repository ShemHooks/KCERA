import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { GetDocTitle } from "../../../../utils/hooks/useDocumentTitle";

const Approveduserstable = ({ resident }) => {
  console.log("residents", resident);
  return (
    <>
      <h1 className="mt-6 ml-10 text-3xl">Residents</h1>
      <GetDocTitle title="KCERA: List of Residents" />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "25%" }}>Fullname</TableCell>
              <TableCell style={{ width: "25%" }}>Email</TableCell>
              <TableCell style={{ width: "25%" }}>Contact No.</TableCell>
              <TableCell style={{ width: "25%" }}>Home Address</TableCell>

              {/* <TableCell style={{ width: "25%" }}>Actions</TableCell> */}
            </TableRow>
          </TableHead>

          <TableBody>
            {resident.map((resident) => (
              <TableRow key={resident.id}>
                <TableCell>{resident.name}</TableCell>
                <TableCell>{resident.email}</TableCell>
                <TableCell>{resident.phone}</TableCell>
                <TableCell>{resident.address}</TableCell>
                {/* <TableCell>
                  <Button variant="contained" onClick={() => approvePending(user.id)}>Approve</Button>{" "}
                  <Button variant="outlined" onClick={() => declinePending(user.id)}>Decline</Button>{" "}
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Approveduserstable;
