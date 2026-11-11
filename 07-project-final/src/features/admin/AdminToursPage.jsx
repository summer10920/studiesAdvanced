import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import AdminGate from './components/AdminGate.jsx';
import TourTable from './components/TourTable.jsx';
import TourForm from './components/TourForm.jsx';
import { tourFromDraft } from './components/tourDraft.js';
import LoadGate from '../../LoadGate.jsx';
import { deleteTour, saveTour } from '../../api.js';
import { useTours } from '../../useAsync.js';

function AdminToursBody() {
  const { data, loading, error, reload } = useTours();
  const tours = data ?? [];
  const [open, setOpen] = useState(false);
  const [tour, setTour] = useState(null);
  const [notice, setNotice] = useState('');
  useEffect(() => {
    document.title = '行程管理 · 洛奇旅行';
  }, []);

  const close = () => setOpen(false);

  const onSave = async (id, draft) => {
    const { error: message, tour: next } = tourFromDraft(draft);
    if (message) return message;
    try {
      await saveTour(id, next);
      reload();
      return '';
    } catch (err) {
      return err.message;
    }
  };

  const onDelete = async (id) => {
    await deleteTour(id);
    reload();
  };

  if (error) return <LoadGate loading={false} error={error} />;
  if (loading && !data) return <LoadGate loading error={null} />;

  return (
    <main
      id="content"
      className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24"
    >
      <p className="font-bold text-action">管理員</p>
      <Typography variant="h1" className="mt-2">
        行程管理
      </Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        新增、修改或下架行程。清單來自
        Firestore。還沒有資料時，先寫入種子。兩頁用頁首切換。
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          variant="outlined"
          onClick={() => {
            setTour(null);
            setOpen(true);
          }}
        >
          新增行程
        </Button>
        <Button component={Link} to="/seed" variant="outlined">
          寫入種子
        </Button>
      </div>
      {tours.length ? (
        <TourTable
          tours={tours}
          onEdit={(item) => {
            setTour(item);
            setOpen(true);
          }}
        />
      ) : (
        <p className="mt-8 text-base text-muted">還沒有行程。</p>
      )}
      <TourForm
        key={open ? (tour?.id ?? 'create') : 'closed'}
        open={open}
        tour={tour}
        onClose={close}
        onSave={onSave}
        onDelete={onDelete}
        onNotice={setNotice}
      />
      <Snackbar
        open={Boolean(notice)}
        autoHideDuration={3200}
        onClose={() => setNotice('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setNotice('')}
        >
          {notice}
        </Alert>
      </Snackbar>
    </main>
  );
}

export default function AdminToursPage() {
  return (
    <AdminGate>
      <AdminToursBody />
    </AdminGate>
  );
}
