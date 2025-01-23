// src/components/RoomGrid.tsx
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
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
      //${roomApiUrl}
      const response = await fetch(`${roomApiUrl}`);
      if (response.ok) {
        const data = await response.json();
        setRooms(data);
      } else {
        setError('Failed to fetch rooms. Please try again later.');
      }
    } catch (error) {
      setError('An error occurred while fetching rooms.');
      console.error('Room fetch error:', error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Out of Service':
        return theme.palette.error.main; // Use theme error color
      case 'In Need of Cleaning':
        return theme.palette.warning.main; // Use theme warning color
      case 'Clean':
        return theme.palette.success.main; // Use theme success color
      default:
        return theme.palette.grey[400]; // Default fallback
    }
  };

  return (
    <div className="p-6">
      <Typography variant="h4" component="h1" className="mb-6 text-center">
        Room Status
      </Typography>

      {error && (
        <Typography variant="body2" className="text-red-500 text-center mb-4">
          {error}
        </Typography>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {rooms.map((room) => (
          <Box
            key={room.id}
            className={`p-4 rounded shadow ${getStatusColor(room.status)}`}
          >
            <Typography variant="h6" className="font-bold text-white">
              Room {room.roomNumber}
            </Typography>
            <Typography variant="body2" className="text-white">
              {room.roomType}
            </Typography>
            <Typography variant="body2" className="text-white">
              Capacity: {room.capacity}
            </Typography>
            <Typography variant="body2" className="text-white">
              Status: {room.status}
            </Typography>
            <Typography variant="body2" className="text-white">
              ${room.price.toFixed(2)}
            </Typography>
          </Box>
        ))}
      </div>
    </div>
  );
};

export default RoomGrid;
