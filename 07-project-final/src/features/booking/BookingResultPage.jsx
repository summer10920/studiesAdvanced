import { data, Link, useLoaderData } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import BookingReceipt from './components/BookingReceipt.jsx';
import BookingSteps from './components/BookingSteps.jsx';
import { getOrder } from '../../api.js';
import { MissingFirebase } from '../../AccessNotice.jsx';
import { requireUser } from '../../auth.js';
import { statusLabel } from '../../format.js';

export const loader = async ({ request, params }) => {
  const gate = await requireUser(request);
  if (!gate.firebaseReady) return { firebaseReady: false, row: null };
  const row = await getOrder(params.id).catch(() => null);
  if (!row || row.uid !== gate.user.uid)
    throw data('找不到頁面', { status: 404 });
  return { firebaseReady: true, row };
};

export default function BookingResultPage() {
  const { firebaseReady: ready, row } = useLoaderData();
  if (!ready) return <MissingFirebase />;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <title>報名已送出 · 洛奇旅行</title>
      <BookingSteps activeStep={2} />
      <Chip color="primary" label={statusLabel[row.status] || '待確認'} />
      <Typography variant="h1" className="mt-3 max-w-[10em]">
        報名已送出
      </Typography>
      <Alert className="mt-4 max-w-prose" severity="success">
        我們會用 email 再跟你確認。到「我的報名」可以查看這一筆。
      </Alert>
      <BookingReceipt row={row} />
      <div className="mt-8 flex flex-wrap gap-3">
        <Button component={Link} to="/me" variant="contained">
          看我的報名
        </Button>
        <Button component={Link} to="/tours" variant="outlined">
          回行程
        </Button>
      </div>
    </main>
  );
}
