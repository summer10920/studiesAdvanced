import { createContext, useContext, useState } from 'react';
import { tours as seedTours } from './data/tours.js';
import { bookings as seedBookings } from './data/bookings.js';

const StoreContext = createContext(null);

const highlightsOf = (text) => String(text).split('\n').map((line) => line.trim()).filter(Boolean);

export function StoreProvider({ children }) {
  const [tours, setTours] = useState(seedTours);
  const [bookings, setBookings] = useState(seedBookings);
  const [lastBooking, setLastBooking] = useState(null);
  const [notice, setNotice] = useState('');

  const saveTour = (editingId, draft) => {
    const id = draft.id.trim();
    if (!id || !draft.title.trim()) return '編號和標題要填';
    const prev = tours.find((item) => item.id === (editingId || id));
    if (tours.some((item) => item.id === id && item !== prev)) return '這個編號已經有了';
    const highlights = highlightsOf(draft.highlights);
    const next = prev
      ? {
          ...prev,
          id,
          title: draft.title.trim(),
          region: draft.region.trim(),
          theme: draft.theme,
          days: Number(draft.days),
          price: Number(draft.price),
          cover: draft.cover.trim(),
          intro: draft.intro.trim(),
          highlights,
          departures: prev.departures.length
            ? [{ ...prev.departures[0], id: draft.date, date: draft.date, capacity: Number(draft.capacity) }, ...prev.departures.slice(1)]
            : [{ id: draft.date, date: draft.date, capacity: Number(draft.capacity) }],
        }
      : {
          id,
          title: draft.title.trim(),
          region: draft.region.trim(),
          theme: draft.theme,
          days: Number(draft.days),
          price: Number(draft.price),
          cover: draft.cover.trim(),
          images: [draft.cover.trim()],
          intro: draft.intro.trim(),
          highlights,
          itinerary: [],
          includes: [],
          excludes: [],
          departures: [{ id: draft.date, date: draft.date, capacity: Number(draft.capacity) }],
          featured: false,
        };
    setTours(prev ? tours.map((item) => (item.id === prev.id ? next : item)) : [next, ...tours]);
    setNotice('已儲存這筆行程');
    return '';
  };

  const deleteTour = (id) => {
    setTours((list) => list.filter((item) => item.id !== id));
    setNotice('已刪除這筆行程');
  };

  const setBookingStatus = (id, status) => {
    setBookings((list) => list.map((item) => (item.id === id ? { ...item, status } : item)));
    setNotice('已更新報名狀態');
  };

  const createBooking = (input) => {
    const row = { id: `local-${Date.now()}`, status: 'pending', uid: 'demo-local', ...input };
    setBookings((list) => [row, ...list]);
    setLastBooking(row);
    setNotice('報名已送出，狀態是待確認');
    return row;
  };

  return (
    <StoreContext.Provider value={{ tours, bookings, lastBooking, notice, clearNotice: () => setNotice(''), saveTour, deleteTour, setBookingStatus, createBooking }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
