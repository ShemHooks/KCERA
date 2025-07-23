import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { Button } from '@mui/material';
const HistoryTable = () => {
    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Request Id
                            </TableCell>
                            <TableCell>
                                Response Id
                            </TableCell>
                            <TableCell>
                                Response Time
                            </TableCell>
                            <TableCell>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                Request Id
                            </TableCell>
                            <TableCell>
                                Response Id
                            </TableCell>
                            <TableCell>
                                Response Time
                            </TableCell>
                            <TableCell>
                                <Button variant='outlined'>View</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>

                </Table>
            </TableContainer>


        </>
    )
}


export default HistoryTable;