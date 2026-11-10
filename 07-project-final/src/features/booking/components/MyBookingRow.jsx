import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { ntd, statusLabel } from '../../../format.js';

const chipColor = {
  pending: 'primary',
  confirmed: 'secondary',
  cancelled: 'error',
};

export default function MyBookingRow({
  status,
  title,
  date,
  people,
  phone,
  subtotal,
}) {
  return (
    <article className="py-6">
      <Chip
        size="small"
        color={chipColor[status] || 'primary'}
        label={statusLabel[status] || status}
      />
      <Typography variant="h3" className="mt-3">
        {title}
      </Typography>
      <dl className="mt-3 grid gap-3 sm:grid-cols-4">
        <div>
          <dt className="text-muted">出發日</dt>
          <dd>{date}</dd>
        </div>
        <div>
          <dt className="text-muted">人數</dt>
          <dd>{people}</dd>
        </div>
        <div>
          <dt className="text-muted">電話</dt>
          <dd>{phone}</dd>
        </div>
        <div>
          <dt className="text-muted">小計</dt>
          <dd className="font-serif text-2xl font-bold text-action">
            {ntd(subtotal)}
          </dd>
        </div>
      </dl>
    </article>
  );
}
