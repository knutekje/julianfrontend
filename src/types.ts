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
    id: number; // Primary Key
    firstName: string; // First Name, required, max length 100
    lastName: string; // Last Name, required, max length 100
    email: string; // Email, required, max length 200, must be a valid email format
    phoneNumber: string; // Phone Number, required, max length 15, must be a valid phone format
    address?: string; // Optional, max length 500
    createdAt: string; // Created date in ISO 8601 format (DateTime in C# is serialized to this in JSON)
    updatedAt?: string | null; // Updated date in ISO 8601 format, optional
  }
  