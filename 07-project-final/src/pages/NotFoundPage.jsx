import { useEffect } from 'react';
import { Link } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = '找不到頁面 · 洛奇旅行';
  }, []);
  return (
    <main
      id="content"
      className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 sm:py-24"
    >
      <Typography variant="h1" className="max-w-[8em]">
        這頁不在路線上
      </Typography>
      <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted">
        這個網址沒有對應的頁面。回到首頁，或去看行程。
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button component={Link} to="/" variant="contained">
          回首頁
        </Button>
        <Button component={Link} to="/tours" variant="outlined">
          去行程
        </Button>
      </div>
    </main>
  );
}
