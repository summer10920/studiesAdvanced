import { Link } from 'react-router';
import Button from '@mui/material/Button';
import { ntd, seatsLeft } from '../../../format.js';

export default function BookingCard({
  tour,
  bookings,
  selected,
  onSelect,
  bookTo,
}) {
  return (
    <aside className="rounded-card bg-white shadow-card sticky top-24 mt-12 hidden self-start p-8 lg:mt-0 lg:block">
      <p className="flex items-baseline gap-1.5 whitespace-nowrap font-serif text-4xl">
        <span className="inline-block rounded-full bg-accent text-ink font-bold leading-[1.15] py-[0.12em] px-[0.55em]">
          {ntd(tour.price)}
        </span>
        <span className="font-sans text-base font-normal text-muted">/ 人</span>
      </p>
      {tour.id === 'kyoto-nara' ? (
        <p className="mt-3 text-base text-muted">不含國際機票</p>
      ) : null}
      <dl className="mt-6 grid gap-3 text-base">
        <div className="flex justify-between gap-4">
          <dt className="text-muted">天數</dt>
          <dd>{tour.days} 天</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">團體上限</dt>
          <dd>{tour.departures[0]?.capacity ?? 8} 人</dd>
        </div>
      </dl>
      <div className="mt-6 grid gap-3">
        {tour.departures.map((departure) => {
          const on = departure.id === selected.id;
          return (
            <button
              key={departure.id}
              type="button"
              onClick={() => onSelect(departure.id)}
              className={`rounded-card border px-4 py-3 text-left ${on ? 'border-action bg-mist' : 'border-line bg-white'}`}
            >
              <span className="block font-medium">{departure.date}</span>
              <span className="text-base text-muted">
                剩餘 {seatsLeft(bookings, tour.id, departure)} 人
              </span>
            </button>
          );
        })}
      </div>
      <Button
        component={Link}
        to={bookTo}
        variant="contained"
        className="mt-8 w-full"
      >
        立即報名
      </Button>
    </aside>
  );
}
