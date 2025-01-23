// src/components/AppBar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import LogoutIcon from '@mui/icons-material/Logout';
import BookIcon from '@mui/icons-material/Book';
import { useNavigate } from 'react-router-dom';

const CustomAppBar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" className="flex-grow font-bold">
          Julian PMS
        </Typography>
        <Button
          startIcon={<DashboardIcon />}
          onClick={() => navigate('/dashboard')}
        >
          Dashboard
        </Button>
        <Button
          startIcon={<EventAvailableIcon />}
          onClick={() => navigate('/availability')}
        >
          Availability
        </Button>
        
        <Button
          startIcon={<MeetingRoomIcon />}
          onClick={() => navigate('/reservation')}
        >
          Reservations
        </Button>
        <Button
          startIcon={<BookIcon />}
          onClick={() => navigate('/bookings')}
        >
          Bookings
        </Button>
        <Button
          startIcon={<BookIcon />}
          onClick={() => navigate('/bookings')}
        >
          Reservation
        </Button>
        <IconButton onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
