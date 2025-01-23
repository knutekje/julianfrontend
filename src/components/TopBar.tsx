import React from 'react';
import {  Toolbar, Typography, IconButton, Avatar, Box, Paper } from '@mui/material';
import { Notifications, Search } from '@mui/icons-material';

const TopBar: React.FC = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        top: '10px',
        left: `260px`, // Adjust to match the sidebar's width and gap
        right: '10px',
        height: '64px',
        borderRadius: '12px',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingX: 2,
        backgroundColor: 'white',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar disableGutters sx={{ width: '100%', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Julian PMS
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="default">
            <Search />
          </IconButton>
          <IconButton color="default">
            <Notifications />
          </IconButton>
          <Avatar alt="User Profile" src="/profile.jpg" />
        </Box>
      </Toolbar>
    </Paper>
  );
};

export default TopBar;
