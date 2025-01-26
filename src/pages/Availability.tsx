import React, { useState } from 'react';
import { Typography, TextField, Button  } from '@mui/material';

const Availability: React.FC = () => {
  const [date, setDate] = useState<string>('');
  const [availability, setAvailability] = useState<unknown[]>([]);
  const [error, setError] = useState<string>('');

  const fetchAvailability = async () => {
    if (!date) {
      setError('Please select a date.');
      return;
    }

    try {
      setError('');
      const response = await fetch(`http://localhost:8080/api/availability?date=${date}`);
      if (response.ok) {
        const data = await response.json();
        setAvailability(data.rooms || []);
      } else {
        setError('Failed to fetch availability. Please try again later.');
      }
    } catch (error) {
      setError('An error occurred while fetching availability.');
      console.error('Availability fetch error:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <Typography variant="h4" component="h1" className="font-bold mb-6 text-center">
        Room Availability
      </Typography>

      <div className="flex justify-center mb-6">
        <TextField
          type="date"
          label="Select Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="text-white"
          InputLabelProps={{
            style: { color: '#bdbdbd' },
          }}
          sx={{
            input: { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#bdbdbd' },
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={fetchAvailability}
          className="ml-4"
        >
          Check
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <Typography variant="body2" className="text-red-500 text-center mb-4">
          {error}
        </Typography>
      )}

      {/* Availability Grid */}
  {/*     <Grid2 container spacing={4}>
        {availability.map((room) => (
          <Grid2 item xs={12} md={6} key={room.id}>
            <Card className="bg-gray-800 text-white">
              <CardContent>
                <Typography variant="h6" className="font-bold">
                  {room.name}
                </Typography>
                <Typography variant="body2" className="text-gray-400">
                  Status: {room.status}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2> */}

      {/* No Data Message */}
      {availability.length === 0 && !error && (
        <Typography variant="body1" className="text-gray-400 text-center mt-6">
          No rooms available for the selected date.
        </Typography>
      )}
    </div>
  );
};

export default Availability;
