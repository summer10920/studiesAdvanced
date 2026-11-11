import { useEffect } from 'react';
import { Link } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MemberGate from './components/MemberGate.jsx';
import MyBookingRow from './components/MyBookingRow.jsx';
import LoadGate from '../../LoadGate.jsx';
import { useAuth } from '../../auth-context.js';
import { useMyOrders } from '../../useAsync.js';

function MyBookingsBody() {
  const { user } = useAuth();
  const { data, loading, error } = useMyOrders(user.uid);
  const rows = data ?? [];
  useEffect(() => {
    document.title = '我的報名 · 洛奇旅行';
  }, []);
  if (loading || error) return <LoadGate loading={loading} error={error} />;

  return (
    <main
      id="content"
      className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24"
    >
      <Typography variant="h1">我的報名</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        這裡列出這個 Google 帳號的訂單。如需改期或取消，請來信或來電。
      </p>
      {rows.length ? (
        <>
          <Typography variant="h2" className="mt-10">
            你的報名
          </Typography>
          <div className="rounded-card bg-white shadow-card mt-6 max-w-3xl divide-y divide-line px-5">
            {rows.map((item) => (
              <MyBookingRow
                key={item.id}
                status={item.status}
                title={item.tourTitle}
                date={item.date}
                people={item.people}
                phone={item.phone}
                subtotal={item.subtotal}
              />
            ))}
          </div>
        </>
      ) : (
        <section className="mt-10 max-w-3xl">
          <Typography id="empty-title" variant="h2">
            還沒有報名
          </Typography>
          <p className="mt-3 max-w-prose">選一個行程，挑一個出發日。</p>
          <Button
            className="mt-6"
            component={Link}
            to="/tours"
            variant="contained"
          >
            去看行程
          </Button>
        </section>
      )}
    </main>
  );
}

export default function MyBookingsPage() {
  return (
    <MemberGate>
      <MyBookingsBody />
    </MemberGate>
  );
}
