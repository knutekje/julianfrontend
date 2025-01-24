import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination, TextField, Box } from '@mui/material';
import { guestApiUrl } from '../uris';
import { Guest } from '../types';

const GuestListPage: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchGuests = async () => {
      const response = await fetch(`${guestApiUrl}`); 
      const data = await response.json();
      setGuests(data);
    };

    fetchGuests();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredGuests = guests.filter((guest) =>
    guest.firstName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <TextField
        variant="outlined"
        label="Search Guests"
        value={search}
        onChange={handleSearchChange}
        sx={{ marginBottom: 2 }}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Check-In Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredGuests
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((guest) => (
              <TableRow key={guest.id}>
                <TableCell>{guest.firstName}</TableCell>
                <TableCell>{guest.email}</TableCell>
                <TableCell>{guest.address}</TableCell>
                <TableCell>{new Date(guest.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filteredGuests.length}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
};

export default GuestListPage;
