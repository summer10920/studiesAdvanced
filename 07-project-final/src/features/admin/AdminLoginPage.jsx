import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAuth } from '../../auth-context.js';

export default function AdminLoginPage() {
  const { signIn, provider } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (provider === 'password') navigate('/admin/bookings');
  }, [provider, navigate]);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signIn(email.trim(), password);
      navigate('/admin/bookings');
    } catch (err) {
      setError(
        err.code === 'auth/invalid-credential'
          ? 'email 或密碼不對。請用主控台建立的那一組。'
          : err.message,
      );
      setBusy(false);
    }
  };

  return (
    <main
      id="content"
      className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-16 sm:px-6 md:py-24"
    >
      <title>後台登入 · 洛奇旅行</title>
      <Paper
        component="form"
        elevation={0}
        className="rounded-card bg-white shadow-card grid max-w-md gap-4 p-6 md:p-8"
        onSubmit={submit}
      >
        <Typography variant="h1">後台登入</Typography>
        <p className="text-lg leading-relaxed">
          使用主控台建立的 email 與密碼。網站上沒有註冊表單。
        </p>
        <TextField
          label="Email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <TextField
          label="密碼"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {error ? <Alert severity="error">{error}</Alert> : null}
        <Button type="submit" variant="contained" disabled={busy}>
          {busy ? '登入中…' : '登入'}
        </Button>
      </Paper>
    </main>
  );
}
