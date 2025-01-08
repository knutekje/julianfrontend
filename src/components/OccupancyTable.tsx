import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { bookingApiUrl } from '../uris';

interface Reservation {
  id: number;
  roomNumber: string;
  guestName: string;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  additionalDetails?: string; // Add more fields as needed
}

const OccupancyTable: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [error, setError] = useState<string>('');

  const fetchReservations = async () => {
    try {
      const response = await fetch(`${bookingApiUrl}`);
      //const response = await fetch('http://localhost:8082/api/bookings');
      if (response.ok) {
        const data = await response.json();
        setReservations(data);
      } else {
        setError('Failed to fetch reservations.');
      }
    } catch (err) {
      setError('An error occurred while fetching reservations.');
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleRowClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
  };

  const handleClose = () => {
    setSelectedReservation(null);
  };

  return (
    <div>
      <Typography variant="h6" className="mb-4">
        Current Occupancies
      </Typography>
      {error && (
        <Typography variant="body2" className="text-red-500 mb-4">
          {error}
        </Typography>
      )}
      <TableContainer component={Paper} className="bg-gray-800">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: '#fff' }}>Room Number</TableCell>
              <TableCell style={{ color: '#fff' }}>Guest Name</TableCell>
              <TableCell style={{ color: '#fff' }}>Check-In Date</TableCell>
              <TableCell style={{ color: '#fff' }}>Check-Out Date</TableCell>
              <TableCell style={{ color: '#fff' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow
                key={reservation.id}
                onClick={() => handleRowClick(reservation)}
                style={{ cursor: 'pointer' }}
                hover
              >
                <TableCell style={{ color: '#b0b0b0' }}>
                  {reservation.roomNumber}
                </TableCell>
                <TableCell style={{ color: '#b0b0b0' }}>
                  {reservation.guestName}
                </TableCell>
                <TableCell style={{ color: '#b0b0b0' }}>
                  {new Date(reservation.checkInDate).toLocaleDateString()}
                </TableCell>
                <TableCell style={{ color: '#b0b0b0' }}>
                  {new Date(reservation.checkOutDate).toLocaleDateString()}
                </TableCell>
                <TableCell style={{ color: '#b0b0b0' }}>
                  {reservation.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Details Dialog */}
      <Dialog open={!!selectedReservation} onClose={handleClose}>
        <DialogTitle>Reservation Details</DialogTitle>
        {selectedReservation && (
          <DialogContent>
            <Typography>
              <strong>Room Number:</strong> {selectedReservation.roomNumber}
            </Typography>
            <Typography>
              <strong>Guest Name:</strong> {selectedReservation.guestName}
            </Typography>
            <Typography>
              <strong>Check-In Date:</strong>{' '}
              {new Date(selectedReservation.checkInDate).toLocaleDateString()}
            </Typography>
            <Typography>
              <strong>Check-Out Date:</strong>{' '}
              {new Date(selectedReservation.checkOutDate).toLocaleDateString()}
            </Typography>
            <Typography>
              <strong>Status:</strong> {selectedReservation.status}
            </Typography>
            {selectedReservation.additionalDetails && (
              <Typography>
                <strong>Additional Details:</strong> {selectedReservation.additionalDetails}
              </Typography>
            )}
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OccupancyTable;
