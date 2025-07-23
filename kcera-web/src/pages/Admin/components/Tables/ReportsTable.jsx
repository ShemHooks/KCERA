import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';

const ReportsTable = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patient Name</TableCell>
            <TableCell>Sex</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Triage</TableCell>
            <TableCell>Chief Complaint</TableCell>
            <TableCell>Care Upon Arrival</TableCell>
            <TableCell>BP</TableCell>
            <TableCell>PR</TableCell>
            <TableCell>RR</TableCell>
            <TableCell>Temp</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => {
            const patient = JSON.parse(item.patient_information || '{}');
            const vitals = JSON.parse(item.vital_signs || '{}');

            return (
              <TableRow key={item.id}>
                <TableCell>{`${patient.firstname} ${patient.lastname}`}</TableCell>
                <TableCell>{patient.sex}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.triage}</TableCell>
                <TableCell>{item.chief_complaint || 'N/A'}</TableCell>
                <TableCell>{item.care_onprogress_upon_arrival}</TableCell>
                <TableCell>{vitals.bp}</TableCell>
                <TableCell>{vitals.pr}</TableCell>
                <TableCell>{vitals.rr}</TableCell>
                <TableCell>{vitals.temp}</TableCell>
                <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReportsTable;
