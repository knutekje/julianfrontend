import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { Room } from '../../types';

interface BookingDetailsDialogProps {
  open: boolean;
  room: Room;
  onClose: () => void;
  onSubmit: (details: { roomNumber: string; guestName: string; specialRequests: string }) => void;
}

const BookingDetailsDialog: React.FC<BookingDetailsDialogProps> = ({ open, room, onClose, onSubmit }) => {
  const [guestName, setGuestName] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  const handleSubmit = () => {
    if (!guestName) {
      alert('Guest name is required.');
      return;
    }
    onSubmit({ roomNumber: room.roomNumber, guestName, specialRequests });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Booking Details</DialogTitle>
      <DialogContent>
        <TextField
          label="Guest Name"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Special Requests"
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Confirm Booking
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingDetailsDialog;
