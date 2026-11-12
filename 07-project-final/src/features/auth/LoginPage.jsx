import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from '../../auth-context.js';

export default function LoginPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get('next');
  const back = next?.startsWith('/') && !next.startsWith('//') ? next : '/';
  const { user, ready, signInWithGoogle } = useAuth();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (ready && user) navigate(back, { replace: true });
  }, [ready, user, back, navigate]);

  const submit = async () => {
    setBusy(true);
    setError('');
    try {
      await signInWithGoogle();
      navigate(back, { replace: true });
    } catch (err) {
      const closed =
        err.code === 'auth/popup-closed-by-user' ||
        err.code === 'auth/cancelled-popup-request';
      setError(
        closed
          ? '已關閉登入視窗。'
          : err.code === 'auth/popup-blocked'
            ? '瀏覽器擋住了登入視窗。'
            : err.message,
      );
      setBusy(false);
    }
  };

  return (
    <main id="content" className="flex-1">
      <title>用 Google 帳號繼續 · 洛奇旅行</title>
      <Dialog
        open
        onClose={() => navigate('/')}
        fullWidth
        maxWidth="xs"
        aria-labelledby="login-title"
      >
        <DialogTitle
          id="login-title"
          className="font-serif text-4xl leading-tight"
        >
          用 Google 帳號繼續
        </DialogTitle>
        <DialogContent>
          <p>
            報名和我的報名會使用 Google 的姓名與 email。我們不另外設定密碼。
          </p>
          {error ? (
            <Alert className="mt-4" severity="error">
              {error}
            </Alert>
          ) : null}
        </DialogContent>
        <DialogActions className="flex flex-col items-stretch gap-3 px-6 pb-6">
          <Button
            type="button"
            variant="contained"
            disabled={busy}
            onClick={submit}
          >
            {busy ? '登入中…' : '用 Google 帳號繼續'}
          </Button>
          <Button type="button" onClick={() => navigate('/')}>
            返回首頁
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
