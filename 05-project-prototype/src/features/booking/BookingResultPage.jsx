import { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import BookingReceipt from './components/BookingReceipt.jsx';
import BookingSteps from './components/BookingSteps.jsx';
import NotFoundPage from '../../pages/NotFoundPage.jsx';
import { statusLabel } from '../../format.js';
import { useStore } from '../../store-context.js';

export default function BookingResultPage() {
  const { id } = useParams();
  const { bookings } = useStore();
  const row = bookings.find((item) => item.id === id);
  useEffect(() => {
    document.title = row ? '報名已送出 · 洛奇旅行' : '找不到頁面 · 洛奇旅行';
  }, [row]);
  if (!row) return <NotFoundPage />;

  return (
    <main
      id="content"
      className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24"
    >
      <BookingSteps activeStep={2} />
      <Chip color="primary" label={statusLabel[row.status] || '待確認'} />
      <Typography variant="h1" className="mt-3 max-w-[10em]">
        報名已送出
      </Typography>
      <Alert className="mt-4 max-w-prose" severity="success">
        我們會用 email 再跟你確認。目前狀態為待確認。
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
