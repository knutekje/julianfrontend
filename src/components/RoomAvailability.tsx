import React, { useState } from 'react';
import { TextField, Button, Typography, List, ListItem } from '@mui/material';

const RoomAvailability: React.FC = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [availableRooms, setAvailableRooms] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleCheckAvailability = async () => {
    if (!checkIn || !checkOut) {
      setError('Both check-in and check-out dates are required.');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8082/api/bookings/available-rooms?checkIn=${checkIn}&checkOut=${checkOut}`
      );

      if (response.ok) {
        const rooms = await response.json();
        setAvailableRooms(rooms);
        setError('');
      } else {
        const message = await response.text();
        setError(message || 'No available rooms.');
        setAvailableRooms([]);
      }
    } catch (err) {
      setError('An error occurred while fetching available rooms.' + err);
    }
  };

  return (
    <div>
      <Typography variant="h6">Check Room Availability</Typography>
      <TextField
        label="Check-In Date"
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ marginRight: 2 }}
      />
      <TextField
        label="Check-Out Date"
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ marginRight: 2 }}
      />
      <Button variant="contained" onClick={handleCheckAvailability}>
        Check Availability
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      {availableRooms.length > 0 && (
        <List>
          {availableRooms.map((room) => (
            <ListItem key={room}>{room}</ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default RoomAvailability;
