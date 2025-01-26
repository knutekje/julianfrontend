import React from 'react';
import { Box, Typography, IconButton, Avatar, Paper } from '@mui/material';
import { Notifications, Search } from '@mui/icons-material';

const TopBar: React.FC = () => {
  return (
    <Paper
      sx={{
        position: 'fixed',
        top: '10px',
        left: '260px', 
        right: '10px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingX: 2,
        border: `1px solid #d3d3d3`, 
        borderRadius: '4px', 
        boxShadow: 'none', 
        backgroundColor: '#ffffff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Julian PMS
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton>
          <Search />
        </IconButton>
        <IconButton>
          <Notifications />
        </IconButton>
        <Avatar alt="User Profile" src="/profile.jpg" />
      </Box>
    </Paper>
  );
};

export default TopBar;
