import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useSession } from '../session.jsx';

export default function AdminLoginPage() {
  const { signInAdmin } = useSession();
  const navigate = useNavigate();
  useEffect(() => { document.title = '後台登入 · 洛奇旅行'; }, []);

  return (
    <main id="content" className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-16 sm:px-6 md:py-24">
      <Paper elevation={0} className="panel max-w-md p-6 md:p-8">
        <Typography variant="h1">後台登入</Typography>
        <p className="mt-4 text-lg leading-relaxed">行程與報名只有管理員可以進入。</p>
        <Button className="mt-6 w-full" variant="contained" onClick={() => { signInAdmin(); navigate('/admin'); }}>用 Google 帳號繼續</Button>
      </Paper>
    </main>
  );
}
