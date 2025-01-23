import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { Reservation } from '../types'; // Shared Reservation type

interface ReservationFormProps {
  reservation: Reservation | null;
  onClose: () => void;
  onSubmit: (reservation: Reservation) => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ reservation, onClose, onSubmit }) => {
  const [guestName, setGuestName] = useState(reservation?.guestName || '');
  const [checkInDate, setCheckInDate] = useState(reservation?.checkInDate || '');
  const [checkOutDate, setCheckOutDate] = useState(reservation?.checkOutDate || '');

  const handleSubmit = () => {
    if (!guestName || !checkInDate || !checkOutDate) {
      alert('All fields are required.');
      return;
    }

    const updatedReservation: Reservation = {
      ...reservation,
      guestName,
      checkInDate,
      checkOutDate,
      status: reservation?.status || 'Active',
    };

    onSubmit(updatedReservation);
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{reservation ? 'Edit Reservation' : 'Create Reservation'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Guest Name"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Check-In Date"
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Check-Out Date"
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReservationForm;
