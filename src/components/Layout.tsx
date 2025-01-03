// src/components/Layout.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import LogoutButton from './LogoutButton';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <AppBar position="static" className="bg-blue-600">
        <Toolbar>
          <Typography variant="h6" component="div" className="flex-1">
            Julian PMS
          </Typography>
          <LogoutButton />
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component="main" className="flex-grow p-4">
        {children}
      </Box>
    </div>
  );
};

export default Layout;
