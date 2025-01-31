// types.ts
export interface Room {
    id: number;
    roomNumber: string;
    roomType: string;
    capacity: number;
    price: number; 
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
  

export interface Booking {
    id: number;
    roomId: number;
    guestId: number;
    checkInDate: string;
    checkOutDate: string;
    checkedIn: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
 export interface Reservation {
    id: number;
    guestId: number;
    guestName: string;
    invoiceId: string;
    status: number;
    checkInDate: string;
    checkOutDate: string;
    createdAt: string;
    updatedAt: string;
    bookings: Booking[];
  }