import React from 'react';
import { Typography, Card, CardContent, Grid } from '@mui/material';

export interface Room {
  id: number;
  roomNumber: string;
  roomType: string;
  capacity: number;
  price: number;
}

const RoomGrid: React.FC<{ rooms: Room[]; onRoomClick: (room: Room) => void }> = ({ rooms, onRoomClick }) => {
  return (
    <div>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Available Rooms
      </Typography>
      <Grid container spacing={2}>
        {rooms.map((room) => (
          <Grid item xs={12} md={4} key={room.id}>
            <Card
              onClick={() => onRoomClick(room)}
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h6">Room {room.roomNumber}</Typography>
                <Typography>Type: {room.roomType}</Typography>
                <Typography>Capacity: {room.capacity}</Typography>
                <Typography>Price: ${room.price.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RoomGrid;
