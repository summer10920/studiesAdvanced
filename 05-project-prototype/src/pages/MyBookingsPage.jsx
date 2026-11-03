import { useEffect } from 'react';
import { Link } from 'react-router';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import MemberGate from '../components/MemberGate.jsx';
import { mySamples } from '../data/bookings.js';
import { ntd, statusLabel } from '../format.js';
import { useSession } from '../session.jsx';
import { useStore } from '../store.jsx';

const chipColor = { pending: 'primary', confirmed: 'secondary', cancelled: 'error' };

function Row({ status, title, date, people, phone, subtotal }) {
  return (
    <article className="py-6">
      <Chip size="small" color={chipColor[status] || 'primary'} label={statusLabel[status] || status} />
      <Typography variant="h3" className="mt-3">{title}</Typography>
      <dl className="mt-3 grid gap-3 sm:grid-cols-4">
        <div><dt className="text-muted">出發日</dt><dd>{date}</dd></div>
        <div><dt className="text-muted">人數</dt><dd>{people}</dd></div>
        <div><dt className="text-muted">電話</dt><dd>{phone}</dd></div>
        <div><dt className="text-muted">小計</dt><dd className="font-serif text-2xl font-bold text-action">{ntd(subtotal)}</dd></div>
      </dl>
    </article>
  );
}

function MeBody() {
  const { user } = useSession();
  const { bookings } = useStore();
  const fresh = bookings.filter((item) => item.email === user.email && String(item.id).startsWith('local-'));
  const samples = user.email === 'lin@example.com' ? mySamples : [];
  useEffect(() => { document.title = '我的報名 · 洛奇旅行'; }, []);

  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <Typography variant="h1">我的報名</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">{user.name} · {user.email}。如需改期或取消，請來信或來電。</p>
      {fresh.length || samples.length ? (
        <>
          <Typography variant="h2" className="mt-10">你的報名</Typography>
          <div className="panel mt-6 max-w-3xl divide-y divide-line px-5">
            {fresh.map((item) => <Row key={item.id} status={item.status} title={item.tourTitle} date={item.date} people={item.people} phone={item.phone} subtotal={item.subtotal} />)}
            {samples.map((item) => <Row key={`${item.title}-${item.date}`} status={item.status} title={item.title} date={item.date} people={item.people} phone={item.phone} subtotal={item.subtotal} />)}
          </div>
        </>
      ) : null}
      {!fresh.length && !samples.length ? (
        <section className="mt-10 max-w-3xl" aria-labelledby="empty-title">
          <Typography id="empty-title" variant="h2">還沒有報名</Typography>
          <p className="mt-3 max-w-prose">選一個行程，挑一個出發日。</p>
          <Button className="mt-6" component={Link} to="/tours" variant="contained">去看行程</Button>
        </section>
      ) : null}
    </main>
  );
}

export default function MyBookingsPage() {
  return <MemberGate><MeBody /></MemberGate>;
}
