import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { roomApiUrl } from '../uris';
import theme from '../theme';

interface Room {
  id: number;
  roomNumber: string;
  roomType: string;
  capacity: number;
  isAvailable: boolean;
  status: string;
  price: number;
}

const RoomGrid: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState<string>('');

  const fetchRooms = async () => {
    try {
      const response = await fetch(`${roomApiUrl}`);
      if (response.ok) {
        const data = await response.json();
        setRooms(data);
      } else {
        setError('Failed to fetch rooms. Please try again later.');
      }
    } catch (err) {
      setError('An error occurred while fetching rooms.');
      console.error('Room fetch error:', err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Out of Service':
        return theme.palette.error.light; 
      case 'In Need of Cleaning':
        return theme.palette.warning.light; 
      case 'Clean':
        return theme.palette.success.light; 
      default:
        return theme.palette.grey[300]; 
    }
  };

  return (
    <Box sx={{ p: 4, bgcolor: theme.palette.background.default }}>
   

      {error && (
        <Typography
          variant="body2"
          color="error"
          align="center"
          sx={{ mb: 2 }}
        >
          {error}
        </Typography>
      )}

      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={room.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: getStatusColor(room.status),
                color: theme.palette.text.primary,
                border: `1px solid ${theme.palette.grey[400]}`, 
                boxShadow: 'none', 
                borderRadius: '4px', 
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  textAlign: 'center',
                  alignItems: 'center',
                  p: 2,
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 'bold' }}
                >
                  Room {room.roomNumber}
                </Typography>
                <Typography variant="body2">Type: {room.roomType}</Typography>
                <Typography variant="body2">
                  Capacity: {room.capacity}
                </Typography>
                <Typography variant="body2">Status: {room.status}</Typography>
                <Typography variant="body2">
                  Price: ${room.price.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RoomGrid;
