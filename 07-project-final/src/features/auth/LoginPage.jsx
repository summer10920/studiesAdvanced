import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
  useSearchParams,
} from 'react-router';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { safeNext, session } from '../../auth.js';
import { auth, missingFirebaseMessage } from '../../firebase.js';

export const loader = async ({ request }) => {
  const current = await session();
  if (!current.firebaseReady) return current;
  if (current.user) {
    const next = new URL(request.url).searchParams.get('next');
    throw redirect(safeNext(next));
  }
  return current;
};

export const action = async ({ request }) => {
  const form = await request.formData();
  const next = safeNext(String(form.get('next') ?? ''));
  if (!auth) return { error: missingFirebaseMessage };
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
    return redirect(next);
  } catch (err) {
    const closed =
      err.code === 'auth/popup-closed-by-user' ||
      err.code === 'auth/cancelled-popup-request';
    return {
      error: closed
        ? '已關閉登入視窗。'
        : err.code === 'auth/popup-blocked'
          ? '瀏覽器擋住了登入視窗。'
          : err.message,
    };
  }
};

export default function LoginPage() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData();
  const [params] = useSearchParams();
  const back = safeNext(params.get('next'));
  const submitting =
    navigation.state === 'submitting' &&
    new URL(navigation.formAction, 'http://localhost').pathname === '/login';

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
          {actionData?.error ? (
            <Alert className="mt-4" severity="error">
              {actionData.error}
            </Alert>
          ) : null}
        </DialogContent>
        <Form method="post">
          <input type="hidden" name="next" value={back} />
          <DialogActions className="flex flex-col items-stretch gap-3 px-6 pb-6">
            <Button type="submit" variant="contained" disabled={submitting}>
              {submitting ? '登入中…' : '用 Google 帳號繼續'}
            </Button>
            <Button type="button" onClick={() => navigate('/')}>
              返回首頁
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    </main>
  );
}
