import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { themes } from '../../tours/mock.data.js';
import { useStore } from '../../../store.jsx';
import FieldSelect from '../../../_shared/FieldSelect.jsx';

const empty = { id: '', title: '', region: '', theme: '城市', days: 2, price: 0, cover: '', intro: '', highlights: '', date: '', capacity: 8 };

export const draftFromTour = (tour) => ({
  id: tour.id,
  title: tour.title,
  region: tour.region,
  theme: tour.theme,
  days: tour.days,
  price: tour.price,
  cover: tour.cover,
  intro: tour.intro,
  highlights: tour.highlights.join('\n'),
  date: tour.departures[0]?.date ?? '',
  capacity: tour.departures[0]?.capacity ?? 8,
});

export default function TourForm({ editingId, draft, setDraft, onClear, onSaved }) {
  const { saveTour, deleteTour } = useStore();
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const set = (key) => (event) => setDraft((current) => ({ ...current, [key]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    const message = saveTour(editingId, draft);
    setError(message);
    if (!message) onSaved(draft.id.trim());
  };

  return (
    <form id="admin-form" className="rounded-card bg-white shadow-card mt-12 grid max-w-3xl gap-4 p-6 sm:grid-cols-2 md:p-8" onSubmit={submit}>
      <Typography variant="h2" className="sm:col-span-2">{editingId ? '編輯行程' : '新增行程'}</Typography>
      <p className="text-muted sm:col-span-2">每日行程、圖集與費用說明若未出現在表單中，儲存時會一併保留。</p>
      {error ? <Alert className="sm:col-span-2" severity="error">{error}</Alert> : null}
      <TextField label="編號" value={draft.id} onChange={set('id')} />
      <TextField label="標題" value={draft.title} onChange={set('title')} />
      <TextField label="地區" value={draft.region} onChange={set('region')} />
      <FieldSelect id="theme" label="主題" value={draft.theme} onChange={(value) => setDraft((current) => ({ ...current, theme: value }))} options={themes.map((item) => ({ value: item, label: item }))} />
      <TextField label="天數" type="number" slotProps={{ htmlInput: { min: 1 } }} value={draft.days} onChange={set('days')} />
      <TextField label="價格" type="number" slotProps={{ htmlInput: { min: 0 } }} value={draft.price} onChange={set('price')} />
      <TextField className="sm:col-span-2" label="封面圖網址" type="url" value={draft.cover} onChange={set('cover')} />
      <TextField className="sm:col-span-2" label="簡介" multiline minRows={3} value={draft.intro} onChange={set('intro')} />
      <TextField className="sm:col-span-2" label="亮點" multiline minRows={3} helperText="一行一則" value={draft.highlights} onChange={set('highlights')} />
      <TextField label="出發日" type="date" slotProps={{ inputLabel: { shrink: true } }} value={draft.date} onChange={set('date')} />
      <TextField label="名額" type="number" slotProps={{ htmlInput: { min: 1 } }} value={draft.capacity} onChange={set('capacity')} />
      <div className="flex flex-wrap gap-3 sm:col-span-2">
        <Button type="submit" variant="contained">儲存</Button>
        <Button type="button" color="error" variant="outlined" disabled={!editingId} onClick={() => setConfirmDelete(true)}>刪除</Button>
        <Button type="button" onClick={() => { setError(''); onClear(); }}>清空，改為新增</Button>
      </div>
      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)} aria-labelledby="delete-title">
        <DialogTitle id="delete-title">刪除這筆行程？</DialogTitle>
        <DialogContent>刪除後，這筆行程不會再出現在列表。</DialogContent>
        <DialogActions className="gap-2 p-4">
          <Button onClick={() => setConfirmDelete(false)}>留下</Button>
          <Button color="error" variant="contained" onClick={() => { deleteTour(editingId); setConfirmDelete(false); onClear(); }}>刪除</Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}

export { empty };
