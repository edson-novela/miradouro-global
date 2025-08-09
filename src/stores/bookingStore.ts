// stores/bookingStore.ts
import { create } from 'zustand';
import { Destination } from '@/types/Destination';

interface BookingState {
  destinationId: string | null;
  destination: Destination | null;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  nights: number; // Adicionando esta linha
  paymentOption: 'now' | 'later';
  setDestination: (destination: Destination) => void;
  setDates: (checkIn: Date | null, checkOut: Date | null) => void;
  setGuests: (guests: number) => void;
  setPaymentOption: (option: 'now' | 'later') => void;
  calculateNights: () => number; // Adicionando esta função
  reset: () => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  destinationId: null,
  destination: null,
  checkIn: null,
  checkOut: null,
  guests: 1,
  nights: 0, // Inicializando como 0
  paymentOption: 'now',
  setDestination: (destination) => set({ 
    destinationId: destination.id,
    destination 
  }),
  setDates: (checkIn, checkOut) => {
    const nights = checkIn && checkOut
      ? Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)))
      : 0;
    set({ checkIn, checkOut, nights });
  },
  setGuests: (guests) => set({ guests }),
  setPaymentOption: (paymentOption) => set({ paymentOption }),
  calculateNights: () => {
    const { checkIn, checkOut } = get();
    return checkIn && checkOut
      ? Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)))
      : 0;
  },
  reset: () => set({ 
    destinationId: null,
    destination: null,
    checkIn: null,
    checkOut: null,
    guests: 1,
    nights: 0,
    paymentOption: 'now'
  }),
}));