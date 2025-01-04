import React, { useState } from 'react';
import BookingDetailsDialog from './BookingPage/BookingDialog';
import BookingStepOne from './BookingPage/BookingStepOne';
import RoomGrid from './BookingPage/RoomGrid';

interface Room {
  id: number;
  roomNumber: string;
  roomType: string;
  capacity: number;
  price: number;
}

const BookingPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSearch = async (people: number, checkIn: string, checkOut: string) => {
    const response = await fetch(`/api/bookings/available-rooms?checkIn=${checkIn}&checkOut=${checkOut}`);
    const data: Room[] = await response.json();
    setRooms(data);
  };

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    setDialogOpen(true);
  };

  const handleBookingSubmit = (details: { roomNumber: string; guestName: string; specialRequests: string }) => {
    console.log('Booking details:', details);
    // Submit booking logic here
  };

  return (
    <div>
      <BookingStepOne onSearch={handleSearch} />
      {rooms.length > 0 && <RoomGrid rooms={rooms} onRoomClick={handleRoomClick} />}
      {selectedRoom && (
        <BookingDetailsDialog
          open={dialogOpen}
          room={selectedRoom}
          onClose={() => setDialogOpen(false)}
          onSubmit={handleBookingSubmit}
        />
      )}
    </div>
  );
};

export default BookingPage;
