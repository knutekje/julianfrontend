import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import { guestApiUrl } from '../uris';

interface Guest {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const GuestPage: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchGuests = async () => {
    try {
      const response = await fetch(`${guestApiUrl}`); 
      if (!response.ok) {
        throw new Error('Failed to fetch guests');
      }
      const data: Guest[] = await response.json();
      setGuests(data);
    } catch (err) {
      setError('An error occurred while fetching guests.');
      console.error('Error fetching guests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Guest List
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                  ID
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                  Name
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                  Email
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                  Phone
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                  Address
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {guests.map((guest) => (
                <TableRow key={guest.id} hover>
                  <TableCell align="left">{guest.id}</TableCell>
                  <TableCell align="left">{guest.name}</TableCell>
                  <TableCell align="left">{guest.email}</TableCell>
                  <TableCell align="left">{guest.phone}</TableCell>
                  <TableCell align="left">{guest.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default GuestPage;
