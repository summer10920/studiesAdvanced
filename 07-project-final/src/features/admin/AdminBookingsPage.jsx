import { useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router';
import Typography from '@mui/material/Typography';
import BookingFilters from './components/BookingFilters.jsx';
import BookingTable from './components/BookingTable.jsx';
import BookingForm from './components/BookingForm.jsx';
import NoticeSnackbar from '../../_shared/NoticeSnackbar.jsx';
import { listOrders, updateOrderStatus } from '../../api.js';
import { AdminDenied, MissingFirebase } from '../../AccessNotice.jsx';
import { requireAdmin } from '../../auth.js';
import { missingFirebaseMessage } from '../../firebase.js';

export const loader = async ({ request }) => {
  const gate = await requireAdmin(request);
  if (!gate.firebaseReady || gate.denied)
    return {
      firebaseReady: gate.firebaseReady,
      denied: Boolean(gate.denied),
      bookings: [],
    };
  return {
    firebaseReady: true,
    denied: false,
    bookings: await listOrders(),
  };
};

export const action = async ({ request }) => {
  const gate = await requireAdmin(request);
  if (!gate.firebaseReady) return { error: missingFirebaseMessage };
  if (gate.denied) return { error: '這個帳號不能進入後台。' };
  const form = await request.formData();
  try {
    await updateOrderStatus(String(form.get('id')), String(form.get('status')));
    return { notice: '已更新報名狀態' };
  } catch (err) {
    return { error: err.message };
  }
};

export default function AdminBookingsPage() {
  const { firebaseReady: ready, denied, bookings } = useLoaderData();
  const save = useFetcher({ key: 'booking-form' });
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('date-desc');
  const [open, setOpen] = useState(false);
  const [booking, setBooking] = useState(null);
  const [notice, setNotice] = useState('');
  const [seenSave, setSeenSave] = useState(null);
  if (save.state === 'idle' && save.data?.notice && save.data !== seenSave) {
    setSeenSave(save.data);
    setOpen(false);
    setNotice(save.data.notice);
  }
  if (!ready) return <MissingFirebase />;
  if (denied) return <AdminDenied />;

  const keyword = query.trim();
  const shown = bookings
    .filter((item) => status === 'all' || item.status === status)
    .filter((item) => !keyword || item.name?.includes(keyword))
    .sort((a, b) =>
      sort === 'date-asc'
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date),
    );

  const close = () => setOpen(false);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <title>報名清單 · 洛奇旅行</title>
      <p className="font-bold text-action">管理員</p>
      <Typography variant="h1" className="mt-2">
        報名清單
      </Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        查看所有訂單，點一筆看明細並改狀態。兩頁用頁首切換。
      </p>
      <BookingFilters
        status={status}
        query={query}
        sort={sort}
        onStatusChange={setStatus}
        onQueryChange={setQuery}
        onSortChange={setSort}
      />
      {shown.length ? (
        <BookingTable
          bookings={shown}
          onView={(item) => {
            save.reset();
            setBooking(item);
            setOpen(true);
          }}
        />
      ) : (
        <p className="mt-8 text-base text-muted">沒有符合的報名。</p>
      )}
      <BookingForm
        key={open ? booking.id : 'closed'}
        open={open}
        booking={booking}
        onClose={close}
      />
      <NoticeSnackbar notice={notice} onClose={() => setNotice('')} />
    </main>
  );
}
