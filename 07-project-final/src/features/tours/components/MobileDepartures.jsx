import Typography from '@mui/material/Typography';
import DepartureList from './DepartureList.jsx';

export default function MobileDepartures({ tour }) {
  return (
    <div className="mt-14 lg:hidden">
      <Typography variant="h2">出發日</Typography>
      <p className="mt-3 text-base text-muted">
        最近一梯 {tour.departures[0].date}，每團 {tour.departures[0].capacity}{' '}
        人。名額不在前台計算。
      </p>
      <DepartureList tour={tour} />
    </div>
  );
}
