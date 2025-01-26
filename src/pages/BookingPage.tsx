import React, { useState, useEffect } from 'react';
import { Stack, TextField, Typography, Box } from '@mui/material';
import BookingDetailsDialog from './BookingPage/BookingDialog';
import RoomGrid from './BookingPage/RoomGrid';
import { bookingApiUrl } from '../uris';

interface Room {
  id: number;
  roomNumber: string;
  roomType: string;
  capacity: number;
  price: number;
}

const BookingPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');

  useEffect(() => {
    const fetchRooms = async () => {
      if (checkIn && checkOut && new Date(checkIn) < new Date(checkOut)) {
        try {
          const response = await fetch(`${bookingApiUrl}available-rooms?checkIn=${checkIn}&checkOut=${checkOut}`);
          if (response.ok) {
            const data: Room[] = await response.json();
            setRooms(data);
          } else {
            console.error('Failed to fetch available rooms');
            setRooms([]);
          }
        } catch (error) {
          console.error('Error fetching rooms:', error);
          setRooms([]);
        }
      } else {
        setRooms([]);
      }
    };

    fetchRooms();
  }, [checkIn, checkOut]);

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    setDialogOpen(true);
  };

  const handleBookingSubmit = async (details: { roomNumber: string; guestName: string; specialRequests: string }) => {
    try {
      const payload = {
        ...details,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        status: 'Pending',
      };
      //const response = await fetch(`${bookingApiUrl}`);
      
      //const response = await fetch('http://localhost:8082/api/bookings', {
        const response = await fetch(`${bookingApiUrl}`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Booking successfully created!');
        setDialogOpen(false);
        setRooms([]); 
      } else {
        const error = await response.json();
        alert(`Failed to create booking: ${error.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred while creating the booking.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        padding: 2,
      }}
    >
      <Stack
        spacing={2}
        sx={{
          width: '400px', 
          textAlign: 'center',
          bgcolor: 'background.paper',
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Enter Booking Details
        </Typography>
        <TextField
          label="Check-In Date"
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="Check-Out Date"
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Stack>
      {rooms.length > 0 ? (
        <RoomGrid rooms={rooms} onRoomClick={handleRoomClick} />
      ) : (
        checkIn &&
        checkOut && (
          <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
            No available rooms. Please adjust the dates.
          </Typography>
        )
      )}
      {selectedRoom && (
        <BookingDetailsDialog
          open={dialogOpen}
          room={selectedRoom}
          onClose={() => setDialogOpen(false)}
          onSubmit={handleBookingSubmit}
        />
      )}
    </Box>
  );
};

export default BookingPage;
