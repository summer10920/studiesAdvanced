import { Link } from 'react-router';
import Button from '@mui/material/Button';
import { seatsLeft } from '../format.js';
import { useSession } from '../session.jsx';

export default function DepartureList({ tour, bookings }) {
  const { user } = useSession();
  return (
    <ul className="panel mt-4 max-w-3xl divide-y divide-line overflow-hidden px-5">
      {tour.departures.map((departure) => {
        const left = seatsLeft(bookings, tour.id, departure);
        const next = `/booking?tourId=${tour.id}&departureId=${departure.id}`;
        const to = user ? next : `/login?next=${encodeURIComponent(next)}`;
        return (
          <li key={departure.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">{departure.date}</p>
              <p className="text-muted">名額 {departure.capacity} 人，剩餘 {left} 人</p>
            </div>
            <Button component={Link} to={to} variant="contained" className="w-full sm:w-auto">立即報名</Button>
          </li>
        );
      })}
    </ul>
  );
}
