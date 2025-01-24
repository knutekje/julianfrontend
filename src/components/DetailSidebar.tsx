import React, { ReactNode } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

interface DetailSidebarProps {
  details: Record<string, ReactNode>;
  onClose: () => void;
}

const DetailSidebar: React.FC<DetailSidebarProps> = ({ details, onClose }) => {
  return (
    <Box
      sx={{
        width: '320px',
        height: '100vh',
        position: 'fixed',
        top: 0,
        right: 0,
        bgcolor: '#ffffff',
        borderLeft: '1px solid #d3d3d3',
        boxShadow: '-2px 0px 8px rgba(0,0,0,0.1)',
        zIndex: 1200,
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 2,
        }}
      >
        <Typography variant="h6">Details</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      <Box
        sx={{
          overflowY: 'auto',
          flexGrow: 1,
        }}
      >
        {Object.entries(details).map(([key, value]) => (
          <Box key={key} sx={{ marginBottom: 2 }}>
            <Typography variant="body2" color="textSecondary">
              {key}
            </Typography>
            <Typography variant="body1">{value}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DetailSidebar;

