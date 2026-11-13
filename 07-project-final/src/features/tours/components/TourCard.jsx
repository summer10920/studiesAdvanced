import { Link } from 'react-router';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { ntd, perPerson } from '../../../format.js';

export default function TourCard({ tour, showTheme = false }) {
  return (
    <Card
      component={Link}
      to={`/tours/${tour.id}`}
      className="flex h-full flex-col overflow-hidden text-inherit no-underline transition-shadow duration-300 hover:shadow-xl motion-reduce:transition-none"
    >
      <CardMedia
        component="img"
        image={tour.cover}
        alt=""
        className="aspect-[4/3] w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          <Chip size="small" color="secondary" label={tour.region} />
          {showTheme ? (
            <Chip size="small" variant="outlined" label={tour.theme} />
          ) : null}
          <Chip size="small" variant="outlined" label={`${tour.days} 天`} />
        </div>
        <Typography variant="h3" className="mt-3 text-ink">
          {tour.title}
        </Typography>
        <p className="mt-2 text-base leading-relaxed text-muted">
          {tour.intro}
        </p>
        <p className="mt-auto pt-5 font-serif text-2xl font-bold text-ink">
          {ntd(tour.price)}{' '}
          <span className="font-sans text-base font-normal text-muted">
            {perPerson(tour)}
          </span>
        </p>
        <Button
          component="span"
          variant="contained"
          className="mt-4 w-full"
          tabIndex={-1}
        >
          看詳情
        </Button>
      </div>
    </Card>
  );
}
