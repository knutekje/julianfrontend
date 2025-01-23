import React, { useEffect, useState } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { Reservation } from '../types'; 
import ReservationForm from '../components/ReservationForm';

const ReservationListPage: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('/api/reservations');
        if (response.ok) {
          const data: Reservation[] = await response.json();
          setReservations(data);
        } else {
          console.error('Failed to fetch reservations');
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  const handleEditClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setSelectedReservation(null);
    setFormOpen(false);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Reservations
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Guest Name</TableCell>
              <TableCell>Check-In Date</TableCell>
              <TableCell>Check-Out Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.guestName}</TableCell>
                <TableCell>{new Date(reservation.checkInDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(reservation.checkOutDate).toLocaleDateString()}</TableCell>
                <TableCell>{reservation.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={() => handleEditClick(reservation)}
                  >
                    Edit
                  </Button>
                  {/* Add cancel logic here */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {formOpen && (
        <ReservationForm
          reservation={selectedReservation}
          onClose={handleFormClose}
          onSubmit={() => {
            // Refresh reservations after form submission
            handleFormClose();
          }}
        />
      )}
    </div>
  );
};

export default ReservationListPage;
