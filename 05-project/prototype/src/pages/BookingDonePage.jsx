import { useEffect } from 'react';
import { Link } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import MemberGate from '../components/MemberGate.jsx';
import { ntd, statusLabel } from '../format.js';
import { useStore } from '../store.jsx';

const steps = ['選出發日', '填寫資料', '送出確認'];
const sample = {
  tourTitle: '花蓮太魯閣與七星潭四日', date: '2026-12-18', people: 2, phone: '0912000111', subtotal: 53600, status: 'pending',
};

function DoneBody() {
  const { lastBooking } = useStore();
  const row = lastBooking || sample;
  useEffect(() => { document.title = '報名已送出 · 洛奇旅行'; }, []);

  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <Stepper activeStep={2} alternativeLabel className="mb-8">
        {steps.map((label) => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
      </Stepper>
      <Chip color="primary" label={statusLabel[row.status] || '待確認'} />
      <Typography variant="h1" className="mt-3 max-w-[10em]">報名已送出</Typography>
      <Alert className="mt-4 max-w-prose" severity="success">我們會用 email 再跟你確認。目前狀態為待確認。</Alert>
      <Typography variant="h2" className="mt-10">這筆內容</Typography>
      <dl className="panel mt-4 max-w-prose divide-y divide-line px-5">
        {[['行程', row.tourTitle], ['出發日', row.date], ['人數', row.people], ['電話', row.phone], ['小計', ntd(row.subtotal)], ['狀態', statusLabel[row.status] || row.status]].map(([label, value]) => (
          <div key={label} className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr]"><dt className="text-muted">{label}</dt><dd className={label === '小計' ? 'font-serif text-2xl font-bold text-action' : undefined}>{value}</dd></div>
        ))}
      </dl>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button component={Link} to="/me" variant="contained">看我的報名</Button>
        <Button component={Link} to="/tours" variant="outlined">回行程</Button>
      </div>
    </main>
  );
}

export default function BookingDonePage() {
  return <MemberGate><DoneBody /></MemberGate>;
}
