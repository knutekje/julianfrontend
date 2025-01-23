// types.ts
export interface Room {
    id: number;
    roomNumber: string;
    roomType: string;
    capacity: number;
    price: number; 
  }
  

  export interface Reservation {
    id?: number; // Optional for new reservations
    guestName: string;
    checkInDate: string;
    checkOutDate: string;
    status: 'Active' | 'Canceled' | 'Completed';
  }
  