import { Link } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MyBookingRow from './components/MyBookingRow.jsx';
import { mySamples } from './mock.data.js';

export default function MyBookingsPage() {
  return (
    <main
      id="content"
      className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24"
    >
      <title>我的報名 · 洛奇旅行</title>
      <Typography variant="h1">我的報名</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        這一頁用範例清單預覽報名長什麼樣子。成品會依 Google
        帳號讀自己的報名。如需改期或取消，請來信或來電。
      </p>
      {mySamples.length ? (
        <>
          <Typography variant="h2" className="mt-10">
            你的報名
          </Typography>
          <div className="rounded-card bg-white shadow-card mt-6 max-w-3xl divide-y divide-line px-5">
            {mySamples.map((item) => (
              <MyBookingRow
                key={`${item.title}-${item.date}`}
                status={item.status}
                title={item.title}
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
