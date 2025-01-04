import React, { useState } from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';

const BookingStepOne: React.FC<{ onSearch: (people: number, checkIn: string, checkOut: string) => void }> = ({ onSearch }) => {
  const [people, setPeople] = useState<number>(1);
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');

  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      alert('Please select both check-in and check-out dates.');
      return;
    }
    if (new Date(checkIn) >= new Date(checkOut)) {
      alert('Check-out date must be later than check-in date.');
      return;
    }
    onSearch(people, checkIn, checkOut);
  };

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Search Available Rooms
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Number of People"
            type="number"
            value={people}
            onChange={(e) => setPeople(Number(e.target.value))}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Check-In Date"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Check-Out Date"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default BookingStepOne;
