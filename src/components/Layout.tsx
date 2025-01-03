// src/components/Layout.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* App Bar */}
      <AppBar position="static" className="bg-blue-600">
        <Toolbar>
          <Typography variant="h6" component="div" className="flex-grow">
            Julian PMS
          </Typography>
          <Button color="inherit" onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
          <Button color="inherit" onClick={() => navigate('/availability')}>
            Availability
          </Button>
          <Button color="inherit" onClick={() => navigate('/reservation')}>
            Reservations
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component="main" className="flex-grow p-6">
        {children}
      </Box>
    </div>
  );
};

export default Layout;
