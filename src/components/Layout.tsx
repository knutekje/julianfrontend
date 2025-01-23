import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './SideBar';
import TopBar from './TopBar';
import DetailSidebar from './DetailSidebar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedDetails, setSelectedDetails] = useState<unknown>(null); // Holds the data to show in the detail sidebar

  const handleItemClick = (details: unknown) => {
    setSelectedDetails(details); // Updates the right sidebar with details of the clicked item
  };

  return (
    <Box
      sx={{
        display: 'flex',
        bgcolor: '#f5f5f5',
        height: '100vh', 
        overflow: 'hidden', 
      }}
    >
      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
/*           marginLeft: '260px', // Width of the Sidebar  */          
          marginTop: '84px',
          overflowY: 'auto', 
          padding: 3,
        }}
      >
        <TopBar />
        {React.cloneElement(children as React.ReactElement, {
          onItemClick: handleItemClick, 
        })}
      </Box>

    
      <DetailSidebar details={selectedDetails} />
    </Box>
  );
};

export default Layout;
