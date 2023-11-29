import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const BookingContext = createContext({});

export function BookingContextProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [bookingReady, setBookingReady] = useState(false);

  useEffect(() => {
    if (bookings.length === 0 && !bookingReady) {
      axios.get('/bookings').then(({ data }) => {
        setBookings(data);
        setBookingReady(true);
      });
    }
  }, [bookings, bookingReady]);

  return (
    <BookingContext.Provider value={{ bookings, setBookings, bookingReady }}>
      {children}
    </BookingContext.Provider>
  );
}
