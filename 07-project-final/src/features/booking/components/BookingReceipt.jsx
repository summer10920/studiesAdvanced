import Typography from '@mui/material/Typography';
import { ntd, statusLabel } from '../../../format.js';

export default function BookingReceipt({ row }) {
  return (
    <>
      <Typography variant="h2" className="mt-10">
        這筆內容
      </Typography>
      <dl className="rounded-card bg-white shadow-card mt-4 max-w-prose divide-y divide-line px-5">
        {[
          ['行程', row.tourTitle],
          ['出發日', row.date],
          ['人數', row.people],
          ['姓名', row.name],
          ['電話', row.phone],
          ['小計', ntd(row.subtotal)],
          ['狀態', statusLabel[row.status] || row.status],
        ].map(([label, value]) => (
          <div key={label} className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr]">
            <dt className="text-muted">{label}</dt>
            <dd
              className={
                label === '小計'
                  ? 'font-serif text-2xl font-bold text-action'
                  : undefined
              }
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
