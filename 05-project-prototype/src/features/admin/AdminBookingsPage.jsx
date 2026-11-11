import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import BookingTable from './components/BookingTable.jsx';
import BookingForm from './components/BookingForm.jsx';
import { statusLabel } from '../../format.js';
import { useStore } from '../../store-context.js';

const statusOptions = ['all', 'pending', 'confirmed', 'cancelled'];

export default function AdminBookingsPage() {
  const { bookings, setBookingStatus } = useStore();
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('date-desc');
  const [open, setOpen] = useState(false);
  const [booking, setBooking] = useState(null);
  const [notice, setNotice] = useState('');
  useEffect(() => {
    document.title = '報名清單 · 洛奇旅行';
  }, []);

  const keyword = query.trim();
  const shown = bookings
    .filter((item) => status === 'all' || item.status === status)
    .filter((item) => !keyword || item.name.includes(keyword))
    .sort((a, b) =>
      sort === 'date-asc'
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date),
    );

  const close = () => setOpen(false);

  const onSave = (id, next) => {
    setBookingStatus(id, next);
    return '';
  };

  return (
    <main
      id="content"
      className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24"
    >
      <p className="font-bold text-action">管理員</p>
      <Typography variant="h1" className="mt-2">
        報名清單
      </Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        查看所有報名，點一筆看明細並改狀態。兩頁用頁首切換。
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-[minmax(0,12rem)_minmax(0,1fr)_minmax(0,14rem)]">
        <TextField
          select
          label="狀態"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          {statusOptions.map((value) => (
            <MenuItem key={value} value={value}>
              {value === 'all' ? '全部' : statusLabel[value]}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="搜尋姓名"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="輸入姓名"
        />
        <TextField
          select
          label="日期排序"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >
          <MenuItem value="date-desc">出發日新到舊</MenuItem>
          <MenuItem value="date-asc">出發日舊到新</MenuItem>
        </TextField>
      </div>
      {shown.length ? (
        <BookingTable
          bookings={shown}
          onView={(item) => {
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
        onSave={onSave}
        onNotice={setNotice}
      />
      <Snackbar
        open={Boolean(notice)}
        autoHideDuration={3200}
        onClose={() => setNotice('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setNotice('')}
        >
          {notice}
        </Alert>
      </Snackbar>
    </main>
  );
}
