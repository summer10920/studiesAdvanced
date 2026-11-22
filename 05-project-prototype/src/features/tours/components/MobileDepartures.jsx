import Typography from '@mui/material/Typography';
import DepartureList from './DepartureList.jsx';
import { seatsLeft } from '../../../format.js';

export default function MobileDepartures({ tour, bookings }) {
  return (
    <div className="mt-14 lg:hidden">
      <Typography variant="h2">出發日</Typography>
      <p className="mt-3 text-base text-muted">
        最近一梯 {tour.departures[0].date} 尚餘{' '}
        {seatsLeft(bookings, tour.id, tour.departures[0])} 人。
      </p>
      <DepartureList tour={tour} bookings={bookings} />
    </div>
  );
}
