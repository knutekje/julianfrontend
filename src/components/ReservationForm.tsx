import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Select,
  InputLabel,
  FormControl,
  TextFieldProps,
} from "@mui/material";
import { DatePicker } from "@mui/lab";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { guestApiUrl } from "../uris";

// Define types
interface Guest {
  id: number;
  name: string;
}

interface Room {
  id: number;
  roomNumber: string;
}

interface BookingFormValues {
  guestId: number;
  roomId: number;
  checkInDate: Date | null;
  checkOutDate: Date | null;
}

const BookingForm: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loadingRooms, setLoadingRooms] = useState<boolean>(false);

  useEffect(() => {
    // Fetch guests
    fetch(`${guestApiUrl}`)
      .then((res) => res.json())
      .then(setGuests)
      .catch((err) => console.error("Error fetching guests:", err));
  }, []);

  const fetchAvailableRooms = async (checkIn: Date, checkOut: Date) => {
    setLoadingRooms(true);
    try {
      const response = await fetch(
        `/api/bookings/available-rooms?checkIn=${checkIn.toISOString()}&checkOut=${checkOut.toISOString()}`
      );
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoadingRooms(false);
    }
  };

  const initialValues: BookingFormValues = {
    guestId: 0,
    roomId: 0,
    checkInDate: null,
    checkOutDate: null,
  };

  const validationSchema = Yup.object().shape({
    guestId: Yup.number().min(1, "Please select a guest").required(),
    roomId: Yup.number().min(1, "Please select a room").required(),
    checkInDate: Yup.date().required("Check-in date is required"),
    checkOutDate: Yup.date()
      .required("Check-out date is required")
      .test("is-after", "Check-out must be after check-in", function (value) {
        return this.parent.checkInDate && value > this.parent.checkInDate;
      }),
  });

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
      <Typography variant="h5" align="center" sx={{ mb: 2 }}>
        New Booking
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Submitting booking:", values);
          fetch("/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          })
            .then((res) => res.json())
            .then((data) => console.log("Booking success:", data))
            .catch((err) => console.error("Booking error:", err));
        }}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Guest</InputLabel>
              <Field as={Select} name="guestId">
                <MenuItem value={0} disabled>
                  Select Guest
                </MenuItem>
                {guests.map((guest) => (
                  <MenuItem key={guest.id} value={guest.id}>
                    {guest.name}
                  </MenuItem>
                ))}
              </Field>
              {touched.guestId && errors.guestId && <Typography color="error">{errors.guestId}</Typography>}
            </FormControl>

            <DatePicker
              label="Check-in Date"
              value={values.checkInDate}
              onChange={(date: Date) => {
                setFieldValue("checkInDate", date);
                if (date && values.checkOutDate) {
                  fetchAvailableRooms(date, values.checkOutDate);
                }
              }}
              renderInput={(params: TextFieldProps) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
            />

            <DatePicker
              label="Check-out Date"
              value={values.checkOutDate}
              onChange={(date: Date) => {
                setFieldValue("checkOutDate", date);
                if (values.checkInDate && date) {
                  fetchAvailableRooms(values.checkInDate, date);
                }
              }}
              renderInput={(params: TextFieldProps) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
            />

            <FormControl fullWidth sx={{ mb: 2 }} disabled={loadingRooms || !values.checkInDate || !values.checkOutDate}>
              <InputLabel>Room</InputLabel>
              <Field as={Select} name="roomId">
                <MenuItem value={0} disabled>
                  {loadingRooms ? "Loading rooms..." : "Select Room"}
                </MenuItem>
                {rooms.map((room) => (
                  <MenuItem key={room.id} value={room.id}>
                    Room {room.roomNumber}
                  </MenuItem>
                ))}
              </Field>
              {touched.roomId && errors.roomId && <Typography color="error">{errors.roomId}</Typography>}
            </FormControl>

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Booking
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default BookingForm;
