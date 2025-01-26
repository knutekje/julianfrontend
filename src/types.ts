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
  
  export interface Guest {
    id: number; 
    firstName: string; 
    lastName: string;
    email: string;
    phoneNumber: string; 
    address?: string; 
    createdAt: string; 
    updatedAt?: string | null; 
  }
  