import { Link } from 'react-router';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { ntd } from '../../../format.js';

export default function TourHeader({ tour }) {
  return (
    <>
      <p>
        <Link
          className="font-bold text-action underline decoration-action/45 underline-offset-4 hover:text-action-hover"
          to="/tours"
        >
          回行程列表
        </Link>
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Chip color="secondary" label={tour.region} />
        <Chip variant="outlined" label={tour.theme} />
        <Chip variant="outlined" label={`${tour.days} 天`} />
      </div>
      <Typography variant="h1" className="mt-4">
        {tour.title}
      </Typography>
      <p className="mt-4 font-serif text-4xl font-bold text-ink lg:hidden">
        {ntd(tour.price)}
        <span className="font-sans text-base font-normal text-muted">
          {' '}
          / 人
        </span>
      </p>
    </>
  );
}
