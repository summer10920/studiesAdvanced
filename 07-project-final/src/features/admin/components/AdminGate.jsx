import { Link } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useAuth } from '../../../auth.jsx';
import { missingFirebaseMessage } from '../../../firebase.js';

export default function AdminGate({ children }) {
  const { user, provider, ready, firebaseReady } = useAuth();
  if (!firebaseReady) {
    return (
      <main
        id="content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24"
      >
        <Alert severity="warning">{missingFirebaseMessage}</Alert>
      </main>
    );
  }
  if (!ready)
    return (
      <main
        id="content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 text-lg text-muted sm:px-6 md:py-24"
      >
        確認身份…
      </main>
    );
  if (!user) {
    return (
      <main
        id="content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24"
      >
        <Alert severity="warning">
          請用主控台建立的 email 與密碼登入後台。
        </Alert>
        <Button
          className="mt-6"
          component={Link}
          to="/admin/login"
          variant="contained"
        >
          到後台登入
        </Button>
      </main>
    );
  }
  if (provider !== 'password') {
    return (
      <main
        id="content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24"
      >
        <Alert severity="warning">
          這個帳號不能進入後台。請改用主控台建立的 email 與密碼。
        </Alert>
        <Button
          className="mt-6"
          component={Link}
          to="/admin/login"
          variant="contained"
        >
          到後台登入
        </Button>
      </main>
    );
  }
  return children;
}
