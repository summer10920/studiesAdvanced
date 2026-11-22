import { useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteTourDialog from './components/DeleteTourDialog.jsx';
import TourTable from './components/TourTable.jsx';
import TourForm from './components/TourForm.jsx';
import NoticeSnackbar from '../../_shared/NoticeSnackbar.jsx';
import { deleteTour, getTours, saveTour } from '../../store.js';

/**
 * 行程管理頁的 loader。進頁前呼叫 getTours，回傳值交給頁面的 useLoaderData。
 * @returns {{ tours: object[] }}
 */
export const loader = () => ({ tours: getTours() });

/**
 * 接收這一頁的表單。intent 為 delete 時刪除該筆並回傳 { notice }。
 * 否則讀 editingId 與 draft，交給 saveTour。失敗回傳 { error }，成功回傳 { notice, saved: true }。
 * 同一 key 的 useFetcher 可從 fetcher.data 讀到這份結果。
 * @param {{ request: Request }} args
 * @returns {Promise<{ notice: string, saved?: boolean } | { error: string }>}
 */
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

/**
 * 行程管理頁。useFetcher({ key: 'tour-form' }) 與 TourForm 共用同一個 fetcher。
 * 渲染時比對尚未處理的 save.data；有 { saved: true } 就關窗並寫入 notice。
 * 打開 Dialog 時呼叫 save.reset()，清掉上一次留下的資料。刪除另用一個沒有 key 的 fetcher。
 * @returns {JSX.Element}
 */
export default function AdminToursPage() {
  const { tours } = useLoaderData();
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
        新增、修改或下架行程。列表會立刻更新。兩頁用頁首切換。
      </p>
      <div className="mt-8">
        <Button variant="outlined" onClick={() => openTour(null)}>
          新增行程
        </Button>
      </div>
      <TourTable tours={tours} onEdit={openTour} onDelete={setDeletingTour} />
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
            { intent: 'delete', id: deletingTour?.id },
            { method: 'post' },
          )
        }
      />
      <NoticeSnackbar notice={notice} onClose={() => setNotice('')} />
    </main>
  );
}
