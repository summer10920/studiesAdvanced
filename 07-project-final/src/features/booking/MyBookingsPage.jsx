import { useEffect } from 'react';
import { Link } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MyBookingsPage() {
  useEffect(() => { document.title = '我的報名 · 洛奇旅行'; }, []);

  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <Typography variant="h1">我的報名</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">這一章沒有會員，瀏覽器也不能讀訂單。確認信走 email，名單只出現在後台。</p>
      <Button className="mt-8" component={Link} to="/tours" variant="contained">去看行程</Button>
    </main>
  );
}
