import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    document.title = '後台登入 · 洛奇旅行';
  }, []);

  return (
    <main
      id="content"
      className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-16 sm:px-6 md:py-24"
    >
      <Paper
        component="form"
        elevation={0}
        className="rounded-card bg-white shadow-card grid max-w-md gap-4 p-6 md:p-8"
        onSubmit={(event) => event.preventDefault()}
      >
        <Typography variant="h1">後台登入</Typography>
        <p className="text-lg leading-relaxed">
          後台使用 email 與密碼。接上資料層時再接到 Authentication。
        </p>
        <TextField
          label="Email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          label="密碼"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type="submit" variant="contained">
          登入
        </Button>
      </Paper>
    </main>
  );
}
