import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { seedTours } from '../../api.js';
import { firebaseReady, missingFirebaseMessage } from '../../firebase.js';

export default function SeedPage() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    document.title = '寫入行程種子 · 洛奇旅行';
  }, []);

  const run = async () => {
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const created = await seedTours();
      setMessage(
        created ? `已寫入 ${created} 筆行程。` : '行程都已存在，沒有覆寫。',
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main
      id="content"
      className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24"
    >
      <Typography variant="h1">寫入行程種子</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        把專案裡的行程寫進 Firestore 的
        tours。已經存在的文件會略過，可以重複按。
      </p>
      {firebaseReady ? null : (
        <Alert className="mt-8" severity="warning">
          {missingFirebaseMessage}
        </Alert>
      )}
      {message ? (
        <Alert className="mt-8" severity="success">
          {message}
        </Alert>
      ) : null}
      {error ? (
        <Alert className="mt-8" severity="error">
          {error}
        </Alert>
      ) : null}
      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          variant="contained"
          disabled={!firebaseReady || busy}
          onClick={run}
        >
          {busy ? '寫入中…' : '寫入種子'}
        </Button>
        <Button component={Link} to="/tours" variant="outlined">
          看行程
        </Button>
      </div>
    </main>
  );
}
