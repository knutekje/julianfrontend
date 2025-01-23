import React from 'react';
import { Box, Paper } from '@mui/material';

const MainContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        marginLeft: '260px', 
        marginTop: '84px',
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Paper
        sx={{
          padding: 3,
          border: `1px solid #d3d3d3`,
          borderRadius: '4px', 
          boxShadow: 'none', 
          backgroundColor: '#ffffff',
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default MainContent;
