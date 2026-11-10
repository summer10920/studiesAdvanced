import { useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import BookingReceipt from './components/BookingReceipt.jsx';
import BookingSteps from './components/BookingSteps.jsx';
import { statusLabel } from '../../format.js';

export default function BookingDonePage() {
  const { state } = useLocation();
  const row = state?.id ? state : null;
  useEffect(() => {
    document.title = '報名已送出 · 洛奇旅行';
  }, []);

  return (
    <main
      id="content"
      className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24"
    >
      <BookingSteps activeStep={2} />
      <Chip color="primary" label={statusLabel[row?.status] || '待確認'} />
      <Typography variant="h1" className="mt-3 max-w-[10em]">
        報名已送出
      </Typography>
      <Alert className="mt-4 max-w-prose" severity="success">
        我們會用 email
        再跟你確認。到「我的報名」可以查看這一筆。重新整理後，這一頁不再帶著剛送出的明細。
      </Alert>
      {row ? (
        <BookingReceipt row={row} />
      ) : (
        <p className="mt-8 max-w-prose text-lg text-muted">
          這一頁只保留剛送出的那一筆。請到我的報名查看，或從行程重新報名。
        </p>
      )}
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
