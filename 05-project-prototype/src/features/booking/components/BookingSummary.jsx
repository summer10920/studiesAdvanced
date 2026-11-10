import Typography from '@mui/material/Typography';
import { ntd } from '../../../format.js';

export default function BookingSummary({ tour, departure }) {
  return (
    <aside className="rounded-card bg-white shadow-card p-6 md:p-8 lg:sticky lg:top-24">
      <Typography variant="h2">這趟行程</Typography>
      <dl className="mt-5 grid gap-4 text-base">
        <div>
          <dt className="text-muted">行程</dt>
          <dd className="mt-1 text-lg font-medium">{tour.title}</dd>
        </div>
        <div>
          <dt className="text-muted">出發日</dt>
          <dd className="mt-1 text-lg">{departure.date}</dd>
        </div>
        <div>
          <dt className="text-muted">天數</dt>
          <dd className="mt-1 text-lg">{tour.days} 天</dd>
        </div>
        <div>
          <dt className="text-muted">每人</dt>
          <dd className="mt-1 whitespace-nowrap font-serif text-3xl font-bold text-ink">
            {ntd(tour.price)}
            <span className="font-sans text-base font-normal text-muted">
              {' '}
              / 人
            </span>
          </dd>
        </div>
      </dl>
    </aside>
  );
}
