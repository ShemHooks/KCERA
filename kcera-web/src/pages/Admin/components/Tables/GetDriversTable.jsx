import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
} from "@mui/material";
import { GetDocTitle } from "../../../../utils/hooks/useDocumentTitle";

const DriversTable = ({ drivers }) => {
  console.log(drivers);
  return (
    <>
      <h1 className="mt-6 ml-10 text-3xl">Drivers</h1>
      <GetDocTitle title="KCERA: List of Drivers" />
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
            {drivers.map((drivers) => (
              <TableRow key={drivers.id}>
                <TableCell>{drivers.name}</TableCell>
                <TableCell>{drivers.email}</TableCell>
                <TableCell>{drivers.phone}</TableCell>
                <TableCell>
                  <Chip
                    label={drivers.status === "active" ? "Online" : "Offline"}
                    color={drivers.status === "active" ? "success" : "error"}
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

export default DriversTable;
