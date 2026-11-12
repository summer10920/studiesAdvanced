import { Form, redirect, useActionData, useNavigation } from 'react-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { session } from '../../auth.js';
import { auth, missingFirebaseMessage } from '../../firebase.js';

export const loader = async () => {
  const current = await session();
  if (current.user?.provider === 'password') throw redirect('/admin/bookings');
  return current;
};

export const action = async ({ request }) => {
  const form = await request.formData();
  if (!auth) return { error: missingFirebaseMessage };
  try {
    await signInWithEmailAndPassword(
      auth,
      String(form.get('email') ?? '').trim(),
      String(form.get('password') ?? ''),
    );
    return redirect('/admin/bookings');
  } catch (err) {
    return {
      error:
        err.code === 'auth/invalid-credential'
          ? 'email 或密碼不對。請用主控台建立的那一組。'
          : err.message,
    };
  }
};

export default function AdminLoginPage() {
  const navigation = useNavigation();
  const actionData = useActionData();
  const submitting =
    navigation.state === 'submitting' &&
    new URL(navigation.formAction, 'http://localhost').pathname ===
      '/admin/login';

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-16 sm:px-6 md:py-24">
      <title>後台登入 · 洛奇旅行</title>
      <Paper
        elevation={0}
        className="rounded-card bg-white shadow-card max-w-md p-6 md:p-8"
      >
        <Form method="post" className="grid gap-4">
          <Typography variant="h1">後台登入</Typography>
          <p className="text-lg leading-relaxed">
            使用主控台建立的 email 與密碼。網站上沒有註冊表單。
          </p>
          <TextField
            name="email"
            label="Email"
            type="email"
            autoComplete="username"
            required
          />
          <TextField
            name="password"
            label="密碼"
            type="password"
            autoComplete="current-password"
            required
          />
          {actionData?.error ? (
            <Alert severity="error">{actionData.error}</Alert>
          ) : null}
          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? '登入中…' : '登入'}
          </Button>
        </Form>
      </Paper>
    </main>
  );
}
