// src/pages/Dashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography,  Button, Card, CardContent, Grid2 } from '@mui/material';
import RoomGrid from '../components/RoomGrid';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <Typography variant="h4" component="h1" gutterBottom className="font-bold text-center">
        Julian PMS 
      </Typography>
      <Typography variant="body1" className="text-center mb-8">
      Dashboard
      </Typography>

      <Grid2 container spacing={4}>
        {/* Availability */}
          <Card className="bg-gray-800 text-white">
            <CardContent>
             
             
              <RoomGrid/>
             
            </CardContent>
          </Card>

        {/* Reservations */}
          <Card className="bg-gray-800 text-white">
            <CardContent>
              <Typography variant="h5" className="font-bold">
                Manage Reservations
              </Typography>
              <Typography variant="body2" className="text-gray-400 mb-4">
                Create and view reservations for your property.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleNavigation('/reservation')}
              >
                Go to Reservations
              </Button>
            </CardContent>
          </Card>
      </Grid2>
    </div>
  );
};

export default Dashboard;
