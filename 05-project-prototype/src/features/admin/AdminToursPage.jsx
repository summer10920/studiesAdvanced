import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import TourTable from './components/TourTable.jsx';
import TourForm from './components/TourForm.jsx';
import { useStore } from '../../store-context.js';

export default function AdminToursPage() {
  const { tours, saveTour, deleteTour } = useStore();
  const [open, setOpen] = useState(false);
  const [tour, setTour] = useState(null);
  const [notice, setNotice] = useState('');
  useEffect(() => {
    document.title = '行程管理 · 洛奇旅行';
  }, []);

  const close = () => setOpen(false);

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
        新增、修改或下架行程。列表會立刻更新。兩頁用頁首切換。
      </p>
      <div className="mt-8">
        <Button
          variant="outlined"
          onClick={() => {
            setTour(null);
            setOpen(true);
          }}
        >
          新增行程
        </Button>
      </div>
      <TourTable
        tours={tours}
        onEdit={(item) => {
          setTour(item);
          setOpen(true);
        }}
      />
      <TourForm
        key={open ? (tour?.id ?? 'create') : 'closed'}
        open={open}
        tour={tour}
        onClose={close}
        onSave={saveTour}
        onDelete={deleteTour}
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
