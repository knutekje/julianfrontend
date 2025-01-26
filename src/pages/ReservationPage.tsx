import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Reservation {
  id: number;
  guestName: string;
  checkInDate: string;
  checkOutDate: string;
  status: string;
}

const sampleReservations: Reservation[] = [
  { id: 1, guestName: 'John Doe', checkInDate: '2025-01-01', checkOutDate: '2025-01-05', status: 'Confirmed' },
  { id: 2, guestName: 'Jane Smith', checkInDate: '2025-01-02', checkOutDate: '2025-01-06', status: 'Checked In' },
];

const ReservationsPage: React.FC<{ onItemClick: (details: unknown) => void }> = ({ onItemClick }) => {
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Guest Name</TableCell>
              <TableCell>Check-In</TableCell>
              <TableCell>Check-Out</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleReservations.map((reservation) => (
              <TableRow
                key={reservation.id}
                hover
                onClick={() => onItemClick(reservation)} 
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{reservation.id}</TableCell>
                <TableCell>{reservation.guestName}</TableCell>
                <TableCell>{reservation.checkInDate}</TableCell>
                <TableCell>{reservation.checkOutDate}</TableCell>
                <TableCell>{reservation.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReservationsPage;
