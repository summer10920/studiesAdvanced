import { useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import TourTable from './components/TourTable.jsx';
import TourForm from './components/TourForm.jsx';
import { deleteTour, getTours, saveTour } from '../../store.js';

export const loader = () => ({ tours: getTours() });

export const action = async ({ request }) => {
  const form = await request.formData();
  if (form.get('intent') === 'delete') {
    deleteTour(String(form.get('id')));
    return { notice: '已刪除這筆行程' };
  }
  const editingId = String(form.get('editingId') ?? '');
  const error = saveTour(editingId, JSON.parse(String(form.get('draft'))));
  return error ? { error } : { notice: '已儲存這筆行程', saved: true };
};

export default function AdminToursPage() {
  const { tours } = useLoaderData();
  const remove = useFetcher();
  const [open, setOpen] = useState(false);
  const [tour, setTour] = useState(null);
  const [deletingTour, setDeletingTour] = useState(null);
  const [notice, setNotice] = useState('');
  const [seenRemove, setSeenRemove] = useState(null);
  if (
    remove.state === 'idle' &&
    remove.data?.notice &&
    remove.data !== seenRemove
  ) {
    setSeenRemove(remove.data);
    setDeletingTour(null);
    setNotice(remove.data.notice);
  }

  const close = () => setOpen(false);

  return (
    <main
      id="content"
      className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24"
    >
      <title>行程管理 · 洛奇旅行</title>
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
        onDelete={setDeletingTour}
      />
      <TourForm
        key={open ? (tour?.id ?? 'create') : 'closed'}
        open={open}
        tour={tour}
        onClose={close}
        onNotice={setNotice}
      />
      <Dialog
        open={Boolean(deletingTour)}
        onClose={() => setDeletingTour(null)}
        aria-labelledby="delete-title"
      >
        <DialogTitle id="delete-title">刪除這筆行程？</DialogTitle>
        <DialogContent>刪除後，這筆行程不會再出現在列表。</DialogContent>
        <DialogActions className="gap-2 p-4">
          <Button onClick={() => setDeletingTour(null)}>留下</Button>
          <Button
            color="error"
            variant="contained"
            disabled={remove.state !== 'idle'}
            onClick={() =>
              remove.submit(
                { intent: 'delete', id: deletingTour.id },
                { method: 'post' },
              )
            }
          >
            刪除
          </Button>
        </DialogActions>
      </Dialog>
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
