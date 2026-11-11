import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AdminGate from './components/AdminGate.jsx';
import AdminTabs from './components/AdminTabs.jsx';
import TourTable from './components/TourTable.jsx';
import TourForm from './components/TourForm.jsx';
import { draftFromTour, empty, tourFromDraft } from './components/tourDraft.js';
import LoadGate from '../../LoadGate.jsx';
import { deleteTour, saveTour } from '../../api.js';
import { useTours } from '../../useAsync.js';

function AdminToursBody() {
  const { data, loading, error, reload } = useTours();
  const tours = data ?? [];
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(empty);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    document.title = '行程管理 · 洛奇旅行';
  }, []);

  if (!started && data) {
    const initial =
      tours.find((item) => item.id === 'hualien-taroko') || tours[0];
    if (initial) {
      setEditingId(initial.id);
      setDraft(draftFromTour(initial));
    }
    setStarted(true);
  }

  const edit = (tour) => {
    setEditingId(tour.id);
    setDraft(draftFromTour(tour));
    document
      .getElementById('admin-form')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  const onSave = async (id, current) => {
    const { error: message, tour } = tourFromDraft(current);
    if (message) return message;
    try {
      await saveTour(id, tour);
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
        新增、修改或下架行程。清單來自 Firestore。還沒有資料時，先寫入種子。
      </p>
      <AdminTabs />
      <div className="mt-4 flex flex-wrap gap-3">
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
        <Button component={Link} to="/seed" variant="outlined">
          寫入種子
        </Button>
      </div>
      {tours.length ? (
        <TourTable tours={tours} onEdit={edit} />
      ) : (
        <p className="mt-8 text-base text-muted">還沒有行程。</p>
      )}
      <TourForm
        editingId={editingId}
        draft={draft}
        setDraft={setDraft}
        onSaved={(id) => setEditingId(id)}
        onSave={onSave}
        onDelete={onDelete}
        onClear={() => {
          setEditingId(null);
          setDraft(empty);
        }}
      />
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
