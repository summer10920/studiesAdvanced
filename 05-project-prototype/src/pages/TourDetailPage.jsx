import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import DepartureList from '../components/DepartureList.jsx';
import FareBox from '../components/FareBox.jsx';
import Gallery from '../components/Gallery.jsx';
import Itinerary from '../components/Itinerary.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import { ntd, seatsLeft } from '../format.js';
import { useSession } from '../session.jsx';
import { useStore } from '../store.jsx';

export default function TourDetailPage() {
  const { id } = useParams();
  const { tours, bookings } = useStore();
  const { user } = useSession();
  const tour = tours.find((item) => item.id === id);
  const [departureId, setDepartureId] = useState(tour?.departures[0]?.id ?? '');
  useEffect(() => { document.title = tour ? `${tour.title} · 洛奇旅行` : '找不到頁面 · 洛奇旅行'; }, [tour]);
  useEffect(() => { setDepartureId(tour?.departures[0]?.id ?? ''); }, [tour]);
  if (!tour) return <NotFoundPage />;

  const selected = tour.departures.find((item) => item.id === departureId) ?? tour.departures[0];
  const next = `/booking?tourId=${tour.id}&departureId=${selected.id}`;
  const bookTo = user ? next : `/login?next=${encodeURIComponent(next)}`;

  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 pb-28 sm:px-6 md:py-24 lg:pb-24">
      <div className="lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(20rem,24rem)] lg:items-start lg:gap-10">
        <div className="min-w-0">
          <p><Link className="text-link" to="/tours">回行程列表</Link></p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Chip color="secondary" label={tour.region} />
            <Chip variant="outlined" label={tour.theme} />
            <Chip variant="outlined" label={`${tour.days} 天`} />
          </div>
          <Typography variant="h1" className="mt-4">{tour.title}</Typography>
          <p className="mt-4 font-serif text-4xl font-bold text-ink lg:hidden">{ntd(tour.price)}<span className="font-sans text-base font-normal text-muted"> / 人</span></p>
          <Gallery images={tour.images} title={tour.title} />
          <p className="mt-8 text-lg leading-relaxed">{tour.intro}</p>
          <Typography variant="h2" className="mt-14">亮點</Typography>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {tour.highlights.map((item) => <li key={item} className="rounded-card bg-mist px-5 py-4 text-base">{item}</li>)}
          </ul>
          <Typography variant="h2" className="mt-14">每日行程</Typography>
          <p className="mt-3 text-base text-muted">展開每一天，看當天去哪裡、晚上住哪裡。</p>
          <Itinerary days={tour.itinerary} />
          <FareBox includes={tour.includes} excludes={tour.excludes} />
          <div className="mt-14 lg:hidden">
            <Typography variant="h2">出發日</Typography>
            <p className="mt-3 text-base text-muted">最近一梯 {tour.departures[0].date} 尚餘 {seatsLeft(bookings, tour.id, tour.departures[0])} 人。</p>
            <DepartureList tour={tour} bookings={bookings} />
          </div>
          <Typography variant="h2" className="mt-14">取消與退款</Typography>
          <p className="mt-3 text-base leading-relaxed text-muted">出團前以 email 確認。未成行全額退回。成行後若要改期，請來信或來電，由我們為你調整。常見問題也寫在關於頁。</p>
        </div>
        <aside className="panel sticky top-24 mt-12 hidden self-start p-8 lg:mt-0 lg:block">
          <p className="flex items-baseline gap-1.5 whitespace-nowrap font-serif text-4xl"><span className="price-tag">{ntd(tour.price)}</span><span className="font-sans text-base font-normal text-muted">/ 人</span></p>
          {tour.id === 'kyoto-nara' ? <p className="mt-3 text-base text-muted">不含國際機票</p> : null}
          <dl className="mt-6 grid gap-3 text-base">
            <div className="flex justify-between gap-4"><dt className="text-muted">天數</dt><dd>{tour.days} 天</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-muted">團體上限</dt><dd>{tour.departures[0]?.capacity ?? 8} 人</dd></div>
          </dl>
          <div className="mt-6 grid gap-3" role="radiogroup" aria-label="選擇梯次">
            {tour.departures.map((departure) => {
              const on = departure.id === selected.id;
              return (
                <button
                  key={departure.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setDepartureId(departure.id)}
                  className={`rounded-card border px-4 py-3 text-left ${on ? 'border-action bg-mist' : 'border-line bg-white'}`}
                >
                  <span className="block font-medium">{departure.date}</span>
                  <span className="text-base text-muted">剩餘 {seatsLeft(bookings, tour.id, departure)} 人</span>
                </button>
              );
            })}
          </div>
          <Button component={Link} to={bookTo} variant="contained" className="mt-8 w-full">立即報名</Button>
        </aside>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
          <p className="font-serif text-2xl font-bold text-ink">{ntd(tour.price)}</p>
          <Button component={Link} to={bookTo} variant="contained">立即報名</Button>
        </div>
      </div>
    </main>
  );
}
