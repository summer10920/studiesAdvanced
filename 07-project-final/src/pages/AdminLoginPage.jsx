import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAuth } from '../auth.jsx';

export default function AdminLoginPage() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => { document.title = '後台登入 · 洛奇旅行'; }, []);
  useEffect(() => { if (user) navigate('/admin/bookings'); }, [user, navigate]);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signIn(email.trim(), password);
      navigate('/admin/bookings');
    } catch (err) {
      setError(err.code === 'auth/invalid-credential' ? 'email 或密碼不對。請用主控台建立的那一組。' : err.message);
      setBusy(false);
    }
  };

  return (
    <main id="content" className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-16 sm:px-6 md:py-24">
      <Paper component="form" elevation={0} className="panel grid max-w-md gap-4 p-6 md:p-8" onSubmit={submit}>
        <Typography variant="h1">後台登入</Typography>
        <p className="text-lg leading-relaxed">使用 Firebase Authentication 的 email 與密碼。前台報名不需要登入。</p>
        <TextField label="Email" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <TextField label="密碼" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        {error ? <Alert severity="error">{error}</Alert> : null}
        <Button type="submit" variant="contained" disabled={busy}>{busy ? '登入中…' : '登入'}</Button>
      </Paper>
    </main>
  );
}
