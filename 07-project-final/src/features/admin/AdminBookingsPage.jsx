import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AdminGate from './components/AdminGate.jsx';
import AdminTabs from './components/AdminTabs.jsx';
import BookingTable from './components/BookingTable.jsx';
import LoadGate from '../../LoadGate.jsx';
import { updateOrderStatus } from '../../api.js';
import { statusLabel } from '../../format.js';
import { useOrders } from '../../useAsync.js';

const statusOptions = ['all', 'pending', 'confirmed', 'cancelled'];

function AdminBookingsBody() {
  const { data, loading, error, reload } = useOrders();
  const bookings = data ?? [];
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('date-desc');
  const [notice, setNotice] = useState('');
  useEffect(() => {
    document.title = '報名清單 · 洛奇旅行';
  }, []);

  const keyword = query.trim();
  const shown = bookings
    .filter((booking) => status === 'all' || booking.status === status)
    .filter((booking) => !keyword || booking.name?.includes(keyword))
    .sort((a, b) =>
      sort === 'date-asc'
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date),
    );

  const changeStatus = async (id, next) => {
    setNotice('');
    try {
      await updateOrderStatus(id, next);
      reload();
    } catch (err) {
      setNotice(err.message);
    }
  };

  if (loading || error) return <LoadGate loading={loading} error={error} />;

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
        查看所有訂單，並把狀態改為待確認、已確認或已取消。
      </p>
      <AdminTabs />
      {notice ? (
        <Alert className="mt-6" severity="error">
          {notice}
        </Alert>
      ) : null}
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
        <BookingTable bookings={shown} onStatus={changeStatus} />
      ) : (
        <p className="mt-8 text-base text-muted">沒有符合的報名。</p>
      )}
    </main>
  );
}

export default function AdminBookingsPage() {
  return (
    <AdminGate>
      <AdminBookingsBody />
    </AdminGate>
  );
}
