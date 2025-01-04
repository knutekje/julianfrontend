import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import LogoutIcon from '@mui/icons-material/Logout';
import BookIcon from '@mui/icons-material/Book';
import { useNavigate } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* AppBar */}
      <AppBar position="static" className="bg-blue-700">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            className="flex-grow font-bold tracking-wide"
          >
            Julian PMS
          </Typography>

          {/* Buttons */}
          <Button
            color="inherit"
            startIcon={<DashboardIcon />}
            onClick={() => navigate('/dashboard')}
            className="rounded-full px-3 py-2"
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            startIcon={<EventAvailableIcon />}
            onClick={() => navigate('/availability')}
            className="rounded-full px-3 py-2"
          >
            Availability
          </Button>
          <Button
            color="inherit"
            startIcon={<MeetingRoomIcon />}
            onClick={() => navigate('/reservation')}
            className="rounded-full px-3 py-2"
          >
            Reservations
          </Button>
          <Button
            color="inherit"
            startIcon={<BookIcon />}
            onClick={() => navigate('/bookings')}
            className="rounded-full px-3 py-2"
          >
            Bookings
          </Button>
          <IconButton
            color="inherit"
            onClick={handleLogout}
            className="rounded-full"
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <main className="flex-grow p-6">{children}</main>
    </div>
  );
};

export default Layout;
