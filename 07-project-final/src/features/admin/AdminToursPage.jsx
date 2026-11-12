import { useState } from 'react';
import { Link, useFetcher, useLoaderData } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteTourDialog from './components/DeleteTourDialog.jsx';
import TourTable from './components/TourTable.jsx';
import TourForm from './components/TourForm.jsx';
import NoticeSnackbar from '../../_shared/NoticeSnackbar.jsx';
import { tourFromDraft } from './components/tourDraft.js';
import { deleteTour, listTours, saveTour } from '../../api.js';
import { AdminDenied, MissingFirebase } from '../../AccessNotice.jsx';
import { requireAdmin } from '../../auth.js';
import { missingFirebaseMessage } from '../../firebase.js';

const gateOr = async (request) => {
  const gate = await requireAdmin(request);
  if (!gate.firebaseReady) return { error: missingFirebaseMessage };
  if (gate.denied) return { error: '這個帳號不能進入後台。' };
  return null;
};

export const loader = async ({ request }) => {
  const gate = await requireAdmin(request);
  if (!gate.firebaseReady || gate.denied)
    return {
      firebaseReady: gate.firebaseReady,
      denied: Boolean(gate.denied),
      tours: [],
    };
  return {
    firebaseReady: true,
    denied: false,
    tours: await listTours(),
  };
};

export const action = async ({ request }) => {
  const blocked = await gateOr(request);
  if (blocked) return blocked;
  const form = await request.formData();
  if (form.get('intent') === 'delete') {
    await deleteTour(String(form.get('id')));
    return { notice: '已刪除這筆行程' };
  }
  const editingId = String(form.get('editingId') ?? '');
  const { error, tour } = tourFromDraft(JSON.parse(String(form.get('draft'))));
  if (error) return { error };
  await saveTour(editingId, tour);
  return { notice: '已儲存這筆行程', saved: true };
};

export default function AdminToursPage() {
  const { firebaseReady: ready, denied, tours } = useLoaderData();
  const save = useFetcher({ key: 'tour-form' });
  const remove = useFetcher();
  const [open, setOpen] = useState(false);
  const [tour, setTour] = useState(null);
  const [deletingTour, setDeletingTour] = useState(null);
  const [notice, setNotice] = useState('');
  const [seenSave, setSeenSave] = useState(null);
  const [seenRemove, setSeenRemove] = useState(null);
  if (save.state === 'idle' && save.data?.saved && save.data !== seenSave) {
    setSeenSave(save.data);
    setOpen(false);
    setNotice(save.data.notice);
  }
  if (
    remove.state === 'idle' &&
    remove.data?.notice &&
    remove.data !== seenRemove
  ) {
    setSeenRemove(remove.data);
    setDeletingTour(null);
    setNotice(remove.data.notice);
  }
  if (!ready) return <MissingFirebase />;
  if (denied) return <AdminDenied />;

  const close = () => setOpen(false);
  const openTour = (item) => {
    save.reset();
    setTour(item);
    setOpen(true);
  };

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <title>行程管理 · 洛奇旅行</title>
      <p className="font-bold text-action">管理員</p>
      <Typography variant="h1" className="mt-2">
        行程管理
      </Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        新增、修改或下架行程。清單來自
        Firestore。還沒有資料時，先寫入種子。兩頁用頁首切換。
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button variant="outlined" onClick={() => openTour(null)}>
          新增行程
        </Button>
        <Button component={Link} to="/seed" variant="outlined">
          寫入種子
        </Button>
      </div>
      {tours.length ? (
        <TourTable tours={tours} onEdit={openTour} onDelete={setDeletingTour} />
      ) : (
        <p className="mt-8 text-base text-muted">還沒有行程。</p>
      )}
      <TourForm
        key={open ? (tour?.id ?? 'create') : 'closed'}
        open={open}
        tour={tour}
        onClose={close}
      />
      <DeleteTourDialog
        tour={deletingTour}
        busy={remove.state !== 'idle'}
        onClose={() => setDeletingTour(null)}
        onConfirm={() =>
          remove.submit(
            { intent: 'delete', id: deletingTour.id },
            { method: 'post' },
          )
        }
      />
      <NoticeSnackbar notice={notice} onClose={() => setNotice('')} />
    </main>
  );
}
