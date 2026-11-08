import Alert from '@mui/material/Alert';

const frame = 'mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24';

export default function LoadGate({ loading, error, children }) {
  if (loading)
    return (
      <main id="content" className={frame}>
        <p className="text-lg text-muted">讀取中…</p>
      </main>
    );
  if (error)
    return (
      <main id="content" className={frame}>
        <Alert severity="error">{error.message}</Alert>
      </main>
    );
  return children;
}
