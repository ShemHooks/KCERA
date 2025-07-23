import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Chip,
} from "@mui/material";
import { GetDocTitle } from "../../../../utils/hooks/useDocumentTitle";

const RespondersTable = ({ responders }) => {
  console.log(responders);

  return (
    <>
      <h1 className="mt-6 ml-10 text-3xl">Responders</h1>
      <GetDocTitle title="KCERA: List of Responders" />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "25%" }}>Fullname</TableCell>
              <TableCell style={{ width: "25%" }}>Email</TableCell>
              <TableCell style={{ width: "25%" }}>Contact</TableCell>
              <TableCell style={{ width: "25%" }}>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {responders.map((responders) => (
              <TableRow key={responders.id}>
                <TableCell>{responders.name}</TableCell>
                <TableCell>{responders.email}</TableCell>
                <TableCell>{responders.phone}</TableCell>
                <TableCell>
                  <Chip
                    label={
                      responders.status === "active" ? "Online" : "Offline"
                    }
                    color={responders.status === "active" ? "success" : "error"}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RespondersTable;
