import { useEffect } from 'react';
import { Link } from 'react-router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AdminGate from './components/AdminGate.jsx';
import AdminTabs from './components/AdminTabs.jsx';
import TourTable from './components/TourTable.jsx';
import LoadGate from '../../LoadGate.jsx';
import { useTours } from '../../useAsync.js';

function AdminToursBody() {
  const { data, loading, error } = useTours();
  const tours = data ?? [];
  useEffect(() => {
    document.title = '行程管理 · 洛奇旅行';
  }, []);
  if (loading || error) return <LoadGate loading={loading} error={error} />;

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
        清單來自
        Firestore。這一章只讀，不在後台新增或修改。還沒有資料時，先寫入種子。
      </p>
      <AdminTabs />
      <Button className="mt-4" component={Link} to="/seed" variant="outlined">
        寫入種子
      </Button>
      {tours.length ? (
        <TourTable tours={tours} />
      ) : (
        <p className="mt-8 text-base text-muted">還沒有行程。</p>
      )}
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
