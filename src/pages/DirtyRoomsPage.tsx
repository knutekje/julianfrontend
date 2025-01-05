import React, { useEffect, useState } from 'react';

interface Room {
  id: number;
  roomNumber: string;
  roomType: string;
  capacity: number;
  status: string;
  price: number;
}

const fetchDirtyRooms = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/rooms/dirty-rooms');
      if (!response.ok) {
        throw new Error('Failed to fetch dirty rooms');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching dirty rooms:', error);
      return [];
    }
  };
  

const DirtyRoomsPage: React.FC = () => {
  const [dirtyRooms, setDirtyRooms] = useState<Room[]>([]);

  useEffect(() => {
    const loadDirtyRooms = async () => {
      const rooms = await fetchDirtyRooms();
      setDirtyRooms(rooms);
    };

    loadDirtyRooms();
  }, []);

  return (
    <div>
      <h1>Dirty Rooms</h1>
      {dirtyRooms.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Room Number</th>
              <th>Room Type</th>
              <th>Capacity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dirtyRooms.map((room) => (
              <tr key={room.id}>
                <td>{room.roomNumber}</td>
                <td>{room.roomType}</td>
                <td>{room.capacity}</td>
                <td>{room.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No dirty rooms found.</p>
      )}
    </div>
  );
};

export default DirtyRoomsPage;
