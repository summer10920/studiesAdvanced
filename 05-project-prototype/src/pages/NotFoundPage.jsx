import { Link, useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <main
      id="content"
      className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 sm:py-24"
    >
      <title>找不到頁面 · 洛奇旅行</title>
      <p className="font-serif text-8xl font-bold leading-none text-ink sm:text-9xl">
        404
      </p>
      <Typography variant="h1" className="mt-6">
        找不到這個頁面
      </Typography>
      <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted">
        這個網址沒有對應的頁面。
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button variant="contained" onClick={() => navigate(-1)}>
          返回上一頁
        </Button>
        <Button component={Link} to="/" variant="outlined">
          回首頁
        </Button>
      </div>
    </main>
  );
}
