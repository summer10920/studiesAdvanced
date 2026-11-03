import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useSession } from '../session.jsx';

export default function LoginPage() {
  const { user, signIn } = useSession();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const raw = params.get('next') || '/';
  const next = raw.startsWith('/') && !raw.startsWith('//') ? raw : '/';
  useEffect(() => { document.title = '用 Google 帳號繼續 · 洛奇旅行'; }, []);

  const go = () => {
    if (!user) signIn();
    navigate(next);
  };

  return (
    <main id="content" className="flex-1">
      <Dialog open onClose={() => navigate('/')} fullWidth maxWidth="xs" aria-labelledby="login-title">
        <DialogTitle id="login-title" className="font-serif text-4xl leading-tight">用 Google 帳號繼續</DialogTitle>
        <DialogContent>
          <p>報名和我的報名會使用 Google 的姓名與 email。我們不另外設定密碼。</p>
          {user ? <p className="mt-4 text-muted">目前是 {user.name}。繼續會沿用這個帳號。</p> : null}
        </DialogContent>
        <DialogActions className="flex flex-col items-stretch gap-3 px-6 pb-6">
          <Button variant="contained" onClick={go}>用 Google 帳號繼續</Button>
          <Button onClick={() => navigate('/')}>返回首頁</Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
