import { Link } from 'react-router';
import Button from '@mui/material/Button';

export default function DepartureList({ tour }) {
  return (
    <ul className="rounded-card bg-white shadow-card mt-4 max-w-3xl divide-y divide-line overflow-hidden px-5">
      {tour.departures.map((departure) => (
        <li
          key={departure.id}
          className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-medium">{departure.date}</p>
            <p className="text-muted">名額 {departure.capacity} 人</p>
          </div>
          <Button
            component={Link}
            to={`/booking?tourId=${tour.id}&departureId=${departure.id}`}
            variant="contained"
            className="w-full sm:w-auto"
          >
            立即報名
          </Button>
        </li>
      ))}
    </ul>
  );
}
