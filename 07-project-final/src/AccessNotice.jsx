import { Link } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { missingFirebaseMessage } from './firebase.js';

const frame = 'mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24';

export function MissingFirebase() {
  return (
    <main id="content" className={frame}>
      <Alert severity="warning">{missingFirebaseMessage}</Alert>
    </main>
  );
}

export function AdminDenied() {
  return (
    <main id="content" className={frame}>
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
