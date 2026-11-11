import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Alert from '@mui/material/Alert';
import { useAuth } from '../../../auth-context.js';
import { missingFirebaseMessage } from '../../../firebase.js';

export default function MemberGate({ children }) {
  const { user, ready, firebaseReady } = useAuth();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (firebaseReady && ready && !user)
      navigate(`/login?next=${encodeURIComponent(`${pathname}${search}`)}`, {
        replace: true,
      });
  }, [firebaseReady, ready, user, pathname, search, navigate]);

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
  if (!ready || !user)
    return (
      <main
        id="content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 text-lg text-muted sm:px-6 md:py-24"
      >
        確認身份…
      </main>
    );
  return children;
}
