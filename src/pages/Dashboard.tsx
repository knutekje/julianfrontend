// src/pages/Dashboard.tsx
import React, { useState } from 'react';
import { Typography, Tabs, Tab, Box, Card, CardContent } from '@mui/material';
import RoomGrid from '../components/RoomGrid';
import OccupancyTable from '../components/OccupancyTable';
import RoomAvailability from '../components/RoomAvailability';
import DirtyRoomsPage from './DirtyRoomsPage';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#1e1e2d', color: '#fff' }}>
  
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Room Status" />
          <Tab label="Occupancy" />
          <Tab label="Guest Arrival List" />
          <Tab label="Current Prices" />
          <Tab label="Summary of Today" />
        </Tabs>
      </Box>
      <Box>
        {activeTab === 0 && (
          <Card>
            <CardContent>
              <RoomGrid />
            </CardContent>
          </Card>
        )}
        {activeTab === 1 && (
          <Card className="bg-gray-800 text-white mb-4">
            <CardContent>
              <OccupancyTable />
            </CardContent>
          </Card>
        )}
        {activeTab === 2 && (
          <Card>
            <CardContent>
              <Typography variant="h6">Guest Arrival List</Typography>
              Guest arrival list will be displayed here.
              <RoomAvailability/>
            </CardContent>
          </Card>
        )}
        {activeTab === 3 && (
          <Card>
            <CardContent>
              <Typography variant="h6">Current Prices</Typography>
              <DirtyRoomsPage/>
            </CardContent>
          </Card>
        )}
        {activeTab === 4 && (
          <Card>
            <CardContent>
              <Typography variant="h6">Summary of Today</Typography>
              Summary of today's checkouts and in-house guests will be displayed here.
            </CardContent>
          </Card>
        )}
      </Box>
    </div>
  );
};

export default Dashboard;
