import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import RoomGrid from '../components/RoomGrid'; // Import RoomGrid component

const Dashboard: React.FC = () => {
  return (
    <>
      <Grid container spacing={3}>
        {/* Example Widgets */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, textAlign: 'center', boxShadow: 3 }}>
            <Typography variant="h6">Occupancy Rate</Typography>
            <Typography variant="h4">94%</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, textAlign: 'center', boxShadow: 3 }}>
            <Typography variant="h6">Reservations Today</Typography>
            <Typography variant="h4">23</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, textAlign: 'center', boxShadow: 3 }}>
            <Typography variant="h6">Available Rooms</Typography>
            <Typography variant="h4">12</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Room Grid Section */}
      <Grid container spacing={3} sx={{ marginTop: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Room Status
          </Typography>
          <RoomGrid /> {/* Add RoomGrid component */}
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
