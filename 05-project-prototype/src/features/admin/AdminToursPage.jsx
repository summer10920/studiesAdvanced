import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AdminTabs from './components/AdminTabs.jsx';
import TourTable from './components/TourTable.jsx';
import TourForm from './components/TourForm.jsx';
import { draftFromTour, empty } from './components/tourDraft.js';
import { useStore } from '../../store-context.js';

export default function AdminToursPage() {
  const { tours, saveTour, deleteTour } = useStore();
  const initial =
    tours.find((item) => item.id === 'hualien-taroko') || tours[0];
  const [editingId, setEditingId] = useState(initial?.id ?? null);
  const [draft, setDraft] = useState(() =>
    initial ? draftFromTour(initial) : empty,
  );
  useEffect(() => {
    document.title = '行程管理 · 洛奇旅行';
  }, []);

  const edit = (tour) => {
    setEditingId(tour.id);
    setDraft(draftFromTour(tour));
    document
      .getElementById('admin-form')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

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
        新增、修改或下架行程。列表會立刻更新。
      </p>
      <AdminTabs />
      <div className="mt-4">
        <Button
          variant="outlined"
          onClick={() => {
            setEditingId(null);
            setDraft(empty);
            document
              .getElementById('admin-form')
              ?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          新增行程
        </Button>
      </div>
      <TourTable tours={tours} onEdit={edit} />
      <TourForm
        editingId={editingId}
        draft={draft}
        setDraft={setDraft}
        onSaved={(id) => setEditingId(id)}
        onSave={saveTour}
        onDelete={deleteTour}
        onClear={() => {
          setEditingId(null);
          setDraft(empty);
        }}
      />
    </main>
  );
}
