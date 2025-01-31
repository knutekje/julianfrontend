import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Box,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import { reservationApiUrl } from "../uris";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Reservation } from "../types";





const ReservationList: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [search, setSearch] = useState<string>("");
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchReservations = async () => {
      const response = await fetch(`${reservationApiUrl}`);
      const data: Reservation[] = await response.json();
      setReservations(data);
    };

    fetchReservations();
  }, []);

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const filteredReservations = reservations.filter((reservation) =>
    reservation.guestName.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Typography variant="h4" align="center" sx={{ mb: 3 }}>
        Reservations
      </Typography>

      <TextField
        variant="outlined"
        label="Search Guests"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Guest Name</TableCell>
            <TableCell>Check-In Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredReservations
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((reservation) => (
              <React.Fragment key={reservation.id}>
                {/* Top-level row */}
                <TableRow>
                  <TableCell>
                    <IconButton onClick={() => toggleRow(reservation.id)}>
                      {expandedRows.includes(reservation.id) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell>{reservation.guestName}</TableCell>
                  <TableCell>{new Date(reservation.checkInDate).toLocaleDateString()}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={3} sx={{ p: 0 }}>
                    <Collapse in={expandedRows.includes(reservation.id)} timeout="auto" unmountOnExit>
                      <Box sx={{ p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
                        <Typography variant="h6">Reservation Details</Typography>
                        <Typography>Invoice: {reservation.invoiceId}</Typography>
                        <Typography>Status: {reservation.status === 1 ? "Active" : "Canceled"}</Typography>

                        <Typography variant="h6" sx={{ mt: 2 }}>
                          Bookings:
                        </Typography>
                        {reservation.bookings.length > 0 ? (
                          reservation.bookings.map((booking) => (
                            <Box key={booking.id} sx={{ pl: 2, mb: 1, borderLeft: "4px solid #007bff" }}>
                              <Typography>Room: {booking.roomId}</Typography>
                              <Typography>
                                Check-in: {new Date(booking.checkInDate).toLocaleString()}
                              </Typography>
                              <Typography>
                                Check-out: {new Date(booking.checkOutDate).toLocaleString()}
                              </Typography>
                              <Typography>Checked In: {booking.checkedIn ? "Yes" : "No"}</Typography>
                            </Box>
                          ))
                        ) : (
                          <Typography>No bookings for this reservation.</Typography>
                        )}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={filteredReservations.length}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
};

export default ReservationList;
