import { tours as seedTours } from './features/tours/mock.data.js';
import { bookings as seedBookings } from './features/booking/mock.data.js';
import { tourFromDraft } from './features/admin/components/tourDraft.js';

let tours = [...seedTours];
let bookings = [...seedBookings];

export const getTours = () => tours;

export const getTour = (id) => tours.find((item) => item.id === id) ?? null;

export const getBookings = () => bookings;

export const getBooking = (id) =>
  bookings.find((item) => item.id === id) ?? null;

export const saveTour = (editingId, draft) => {
  const { error, tour } = tourFromDraft(draft);
  if (error) return error;
  tours = editingId
    ? tours.map((item) =>
        item.id === editingId ? { ...tour, id: editingId } : item,
      )
    : [{ ...tour, id: `tour-${Date.now()}` }, ...tours];
  return '';
};

export const deleteTour = (id) => {
  tours = tours.filter((item) => item.id !== id);
};

export const setBookingStatus = (id, status) => {
  bookings = bookings.map((item) =>
    item.id === id ? { ...item, status } : item,
  );
};

export const createBooking = (input) => {
  const row = {
    id: `local-${Date.now()}`,
    status: 'pending',
    uid: 'demo-local',
    ...input,
  };
  bookings = [row, ...bookings];
  return row;
};
