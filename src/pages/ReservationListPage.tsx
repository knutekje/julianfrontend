import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Reservation } from "../types";
import { reservationApiUrl } from "../uris";



const ReservationList: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`${reservationApiUrl}`); 
        if (!response.ok) {
          throw new Error("Failed to fetch reservations.");
        }
        const data: Reservation[] = await response.json();
        setReservations(data);
      } catch (err) {
        console.log(err)
        setError("Error fetching reservations.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) return <Typography>Loading reservations...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ width: "100%", maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" align="center" sx={{ mb: 3 }}>
        Reservations
      </Typography>

      {reservations.map((reservation) => (
        <Accordion key={reservation.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              Guest: {reservation.guestName} | Invoice: {reservation.invoiceId}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography variant="subtitle1">Bookings:</Typography>
            <List>
              {reservation.bookings.map((booking) => (
                <React.Fragment key={booking.id}>
                  <ListItem>
                    <ListItemText
                      primary={`Room: ${booking.roomId} | Checked In: ${
                        booking.checkedIn ? "Yes" : "No"
                      }`}
                      secondary={`Check-in: ${new Date(
                        booking.checkInDate
                      ).toLocaleString()} | Check-out: ${new Date(
                        booking.checkOutDate
                      ).toLocaleString()}`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ReservationList;
