import { Link } from 'react-router';
import Button from '@mui/material/Button';
import { ntd } from '../../../format.js';

export default function MobileBookingBar({ price, bookTo }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur lg:hidden">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
        <p className="font-serif text-2xl font-bold text-ink">{ntd(price)}</p>
        <Button component={Link} to={bookTo} variant="contained">
          立即報名
        </Button>
      </div>
    </div>
  );
}
