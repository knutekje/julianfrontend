import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const checkinsData = [
  { time: '8 AM', checkIns: 5 },
  { time: '10 AM', checkIns: 8 },
  { time: '12 PM', checkIns: 15 },
  { time: '2 PM', checkIns: 10 },
  { time: '4 PM', checkIns: 6 },
];

const checkoutsData = [
  { time: '8 AM', checkOuts: 7 },
  { time: '10 AM', checkOuts: 12 },
  { time: '12 PM', checkOuts: 10 },
  { time: '2 PM', checkOuts: 8 },
  { time: '4 PM', checkOuts: 5 },
];

const Dashboard: React.FC = () => {
  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      {/* Widgets */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ padding: 3, boxShadow: 3 }}>
          <Typography variant="h6">Occupancy Rate</Typography>
          <Typography variant="h4" color="primary">
            94%
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ padding: 3, boxShadow: 3 }}>
          <Typography variant="h6">Reservations Today</Typography>
          <Typography variant="h4" color="primary">
            23
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ padding: 3, boxShadow: 3 }}>
          <Typography variant="h6">Available Rooms</Typography>
          <Typography variant="h4" color="primary">
            12
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ padding: 3, boxShadow: 3 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Check-ins Today
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={checkinsData}>
              <Line type="monotone" dataKey="checkIns" stroke="#1976d2" strokeWidth={2} />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ padding: 3, boxShadow: 3 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Checkouts Today
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={checkoutsData}>
              <Line type="monotone" dataKey="checkOuts" stroke="#d32f2f" strokeWidth={2} />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
