import React from 'react';
import { Box, CssBaseline, Paper } from '@mui/material';
import TopBar from './TopBar';
import Sidebar from './SideBar';

const drawerWidth = 240; // Define the width of the Sidebar

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', bgcolor: '#f5f5f5', height: '100vh' }}>
      <CssBaseline />

      {/* Sidebar with rounded and floating appearance */}
      <Paper
        elevation={3}
        sx={{
          width: drawerWidth,
          height: 'calc(100vh - 20px)', // Leave space for floating effect
          position: 'fixed',
          margin: '10px', // Gap between the sidebar and edges
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <Sidebar drawerWidth={drawerWidth} />
      </Paper>

      {/* Topbar with rounded and floating appearance */}
      <Paper
        elevation={3}
        sx={{
          width: `calc(100% - ${drawerWidth + 20}px)`, // Ensure space for the sidebar and floating effect
          height: '64px',
          position: 'fixed',
          top: '10px',
          left: `${drawerWidth + 10}px`,
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          overflow: 'hidden',
        }}
      >
        <TopBar />
      </Paper>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: `${drawerWidth + 20}px`, // Offset by sidebar and its margin
          marginTop: '84px', // Offset by topbar and its margin
          padding: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
