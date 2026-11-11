import { useState } from 'react';
import { tours as seedTours } from './features/tours/mock.data.js';
import { bookings as seedBookings } from './features/booking/mock.data.js';
import { StoreContext } from './store-context.js';
import { tourFromDraft } from './features/admin/components/tourDraft.js';

export function StoreProvider({ children }) {
  const [tours, setTours] = useState(seedTours);
  const [bookings, setBookings] = useState(seedBookings);
  const saveTour = (editingId, draft) => {
    const { error, tour } = tourFromDraft(draft);
    if (error) return error;
    const prev = tours.find((item) => item.id === (editingId || tour.id));
    if (tours.some((item) => item.id === tour.id && item !== prev))
      return '這個編號已經有了';
    setTours(
      prev
        ? tours.map((item) => (item.id === prev.id ? tour : item))
        : [tour, ...tours],
    );
    return '';
  };

  const deleteTour = (id) => {
    setTours((list) => list.filter((item) => item.id !== id));
  };

  const setBookingStatus = (id, status) => {
    setBookings((list) =>
      list.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  };

  const createBooking = (input) => {
    const row = {
      id: `local-${Date.now()}`,
      status: 'pending',
      uid: 'demo-local',
      ...input,
    };
    setBookings((list) => [row, ...list]);
    return row;
  };

  return (
    <StoreContext.Provider
      value={{
        tours,
        bookings,
        saveTour,
        deleteTour,
        setBookingStatus,
        createBooking,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
