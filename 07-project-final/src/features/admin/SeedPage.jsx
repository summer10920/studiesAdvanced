import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
} from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { seedTours } from '../../api.js';
import { AdminDenied, MissingFirebase } from '../../AccessNotice.jsx';
import { requireAdmin } from '../../auth.js';
import { missingFirebaseMessage } from '../../firebase.js';

export const loader = async ({ request }) => {
  const gate = await requireAdmin(request);
  return { firebaseReady: gate.firebaseReady, denied: Boolean(gate.denied) };
};

export const action = async ({ request }) => {
  const gate = await requireAdmin(request);
  if (!gate.firebaseReady) return { error: missingFirebaseMessage };
  if (gate.denied) return { error: '請先用後台帳號登入。' };
  try {
    return { created: await seedTours() };
  } catch (err) {
    return { error: err.message };
  }
};

export default function SeedPage() {
  const { firebaseReady: ready, denied } = useLoaderData();
  const result = useActionData();
  const navigation = useNavigation();
  const busy = navigation.state === 'submitting';
  if (!ready) return <MissingFirebase />;
  if (denied) return <AdminDenied />;
  const message =
    result?.created == null
      ? ''
      : result.created
        ? `已寫入 ${result.created} 筆行程。`
        : '行程都已存在，沒有覆寫。';

  return (
    <main
      id="content"
      className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24"
    >
      <title>寫入行程種子 · 洛奇旅行</title>
      <Typography variant="h1">寫入行程種子</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        把專案裡的行程寫進 Firestore 的
        tours。已經存在的文件會略過，可以重複按。規則允許管理員寫入後才能按，請先用後台帳號登入。
      </p>
      {message ? (
        <Alert className="mt-8" severity="success">
          {message}
        </Alert>
      ) : null}
      {result?.error ? (
        <Alert className="mt-8" severity="error">
          {result.error}
        </Alert>
      ) : null}
      <Form method="post" className="mt-8 flex flex-wrap gap-3">
        <Button type="submit" variant="contained" disabled={busy}>
          {busy ? '寫入中…' : '寫入種子'}
        </Button>
        <Button component={Link} to="/tours" variant="outlined">
          看行程
        </Button>
      </Form>
    </main>
  );
}
