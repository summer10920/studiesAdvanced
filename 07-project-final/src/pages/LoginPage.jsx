import { useEffect } from 'react';
import { Link } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function LoginPage() {
  useEffect(() => { document.title = '報名不必登入 · 洛奇旅行'; }, []);

  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <Typography variant="h1">報名不必登入</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">前台沒有會員。選好出發日後直接填表。管理員登入在頁尾。</p>
      <Button className="mt-8" component={Link} to="/tours" variant="contained">去看行程</Button>
    </main>
  );
}
