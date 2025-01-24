import React, { ReactNode, useState } from 'react';
import { Box } from '@mui/material';
import TopBar from './TopBar';
import Sidebar from './SideBar';
import DetailSidebar from './DetailSidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [selectedDetails, setSelectedDetails] = useState<Record<string, ReactNode> | null>(null);

  /*  const handleItemClick = (details: Record<string, ReactNode>) => {
    setSelectedDetails(details); // Set details for the right sidebar
   } */

  const handleCloseDetails = () => {
    setSelectedDetails(null);
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
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          marginRight: selectedDetails ? '320px' : '0px', 
          transition: 'margin-right 0.3s ease',
        }}
      >
        <TopBar />
        <Box
          sx={{
            flexGrow: 1,
            marginTop: '64px', 
            overflowY: 'auto', 
            padding: 3,
          }}
        >
         
          {children}
        </Box>
      </Box>

      {selectedDetails && (
        <DetailSidebar details={selectedDetails} onClose={handleCloseDetails} />
      )}
    </Box>
  );
};

export default Layout;
