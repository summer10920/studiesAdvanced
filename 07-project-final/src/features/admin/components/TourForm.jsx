import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { themes } from '../../tours/mock.data.js';
import FieldSelect from '../../../_shared/FieldSelect.jsx';
import DraftRows from './DraftRows.jsx';
import { draftFromTour, empty } from './tourDraft.js';

export default function TourForm({ open, tour, onClose, onSave, onNotice }) {
  const editingId = tour?.id ?? null;
  const [draft, setDraft] = useState(() =>
    tour ? draftFromTour(tour) : empty,
  );
  const [error, setError] = useState('');
  const set = (key) => (event) =>
    setDraft((current) => ({ ...current, [key]: event.target.value }));
  const setList = (key) => (items) =>
    setDraft((current) => ({ ...current, [key]: items }));

  const submit = async (event) => {
    event.preventDefault();
    const message = await onSave(editingId, draft);
    setError(message);
    if (!message) {
      onNotice('已儲存這筆行程');
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      scroll="paper"
      aria-labelledby="tour-form-title"
    >
      <form id="admin-form" onSubmit={submit}>
        <DialogTitle id="tour-form-title">
          {tour ? '編輯行程' : '新增行程'}
        </DialogTitle>
        <DialogContent className="grid gap-4 pt-2 sm:grid-cols-2">
          <p className="text-muted sm:col-span-2">
            圖庫、每日行程與出發梯次可增刪列。空的網址列會略過。封面用圖庫第一張。
          </p>
          {error ? (
            <Alert className="sm:col-span-2" severity="error">
              {error}
            </Alert>
          ) : null}
          <TextField
            className="sm:col-span-2"
            label="標題"
            value={draft.title}
            onChange={set('title')}
          />
          <TextField
            label="地區"
            value={draft.region}
            onChange={set('region')}
          />
          <FieldSelect
            id="theme"
            label="主題"
            value={draft.theme}
            onChange={(value) =>
              setDraft((current) => ({ ...current, theme: value }))
            }
            options={themes.map((item) => ({ value: item, label: item }))}
          />
          <TextField
            label="天數"
            type="number"
            slotProps={{ htmlInput: { min: 1 } }}
            value={draft.days}
            onChange={set('days')}
          />
          <TextField
            label="價格"
            type="number"
            slotProps={{ htmlInput: { min: 0 } }}
            value={draft.price}
            onChange={set('price')}
          />
          <TextField
            className="sm:col-span-2"
            label="簡介"
            multiline
            minRows={3}
            value={draft.intro}
            onChange={set('intro')}
          />
          <TextField
            className="sm:col-span-2"
            label="亮點"
            multiline
            minRows={3}
            helperText="一行一則"
            value={draft.highlights}
            onChange={set('highlights')}
          />
          <TextField
            className="sm:col-span-2"
            label="費用包含"
            multiline
            minRows={3}
            helperText="一行一則"
            value={draft.includes}
            onChange={set('includes')}
          />
          <TextField
            className="sm:col-span-2"
            label="費用不含"
            multiline
            minRows={3}
            helperText="一行一則"
            value={draft.excludes}
            onChange={set('excludes')}
          />
          <DraftRows
            title="圖庫網址"
            items={draft.images}
            blank=""
            addLabel="新增一張"
            onChange={setList('images')}
          >
            {(item, index, update) => (
              <TextField
                className="sm:col-span-2"
                label={`第 ${index + 1} 張網址`}
                type="url"
                helperText={
                  index === 0 ? '第一張會當作列表與輪播的封面' : undefined
                }
                value={item}
                onChange={(event) => update(index, event.target.value)}
              />
            )}
          </DraftRows>
          <DraftRows
            title="每日行程"
            items={draft.itinerary}
            blank={{ title: '', body: '' }}
            addLabel="新增一天"
            onChange={setList('itinerary')}
          >
            {(item, index, update) => (
              <>
                <p className="text-muted sm:col-span-2">第 {index + 1} 天</p>
                <TextField
                  className="sm:col-span-2"
                  label="當日標題"
                  value={item.title}
                  onChange={(event) =>
                    update(index, { ...item, title: event.target.value })
                  }
                />
                <TextField
                  className="sm:col-span-2"
                  label="當日說明"
                  multiline
                  minRows={2}
                  value={item.body}
                  onChange={(event) =>
                    update(index, { ...item, body: event.target.value })
                  }
                />
              </>
            )}
          </DraftRows>
          <DraftRows
            title="出發梯次"
            items={draft.departures}
            blank={{ date: '', capacity: 8 }}
            addLabel="新增一梯"
            onChange={setList('departures')}
          >
            {(item, index, update) => (
              <>
                <TextField
                  label="出發日"
                  type="date"
                  slotProps={{ inputLabel: { shrink: true } }}
                  value={item.date}
                  onChange={(event) =>
                    update(index, { ...item, date: event.target.value })
                  }
                />
                <TextField
                  label="名額"
                  type="number"
                  slotProps={{ htmlInput: { min: 1 } }}
                  value={item.capacity}
                  onChange={(event) =>
                    update(index, { ...item, capacity: event.target.value })
                  }
                />
              </>
            )}
          </DraftRows>
          <FormControlLabel
            className="sm:col-span-2"
            control={
              <Checkbox
                checked={draft.featured}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    featured: event.target.checked,
                  }))
                }
              />
            }
            label="精選，出現在首頁輪播與熱門"
          />
        </DialogContent>
        <DialogActions className="flex-wrap gap-2 p-4">
          <Button type="submit" variant="contained">
            儲存
          </Button>
          <Button type="button" onClick={onClose}>
            取消
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
