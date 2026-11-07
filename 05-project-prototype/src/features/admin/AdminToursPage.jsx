import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import AdminGate from './components/AdminGate.jsx';
import AdminTabs from './components/AdminTabs.jsx';
import TourForm, { draftFromTour, empty } from './components/TourForm.jsx';
import { ntd } from '../../format.js';
import { useStore } from '../../store.jsx';

function AdminToursBody() {
  const { tours } = useStore();
  const initial = tours.find((item) => item.id === 'hualien-taroko') || tours[0];
  const [editingId, setEditingId] = useState(initial?.id ?? null);
  const [draft, setDraft] = useState(() => (initial ? draftFromTour(initial) : empty));
  useEffect(() => { document.title = '行程管理 · 洛奇旅行'; }, []);

  const edit = (tour) => {
    setEditingId(tour.id);
    setDraft(draftFromTour(tour));
    document.getElementById('admin-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <p className="font-bold text-action">管理員</p>
      <Typography variant="h1" className="mt-2">行程管理</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">新增、修改或下架行程。列表會立刻更新。</p>
      <AdminTabs />
      <div className="mt-4">
        <Button variant="outlined" onClick={() => { setEditingId(null); setDraft(empty); document.getElementById('admin-form')?.scrollIntoView({ behavior: 'smooth' }); }}>新增行程</Button>
      </div>
      <TableContainer elevation={0} className="rounded-card bg-white shadow-card mt-8 hidden overflow-x-auto md:block">
        <Table>
          <TableHead>
            <TableRow>
              {['標題', '地區', '主題', '天數', '價格', '操作'].map((label) => <TableCell key={label} className="px-4 py-3">{label}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {tours.map((tour) => (
              <TableRow key={tour.id}>
                <TableCell className="px-4 py-4">{tour.title}</TableCell>
                <TableCell className="px-4 py-4">{tour.region}</TableCell>
                <TableCell className="px-4 py-4">{tour.theme}</TableCell>
                <TableCell className="px-4 py-4">{tour.days} 天</TableCell>
                <TableCell className="px-4 py-4">{ntd(tour.price)}</TableCell>
                <TableCell className="px-4 py-4"><Button onClick={() => edit(tour)}>編輯</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mt-8 grid gap-4 md:hidden">
        {tours.map((tour) => (
          <Card key={tour.id} className="p-6">
            <h3 className="font-serif text-2xl font-semibold">{tour.title}</h3>
            <p className="mt-2 text-muted">{tour.region} · {tour.theme} · {tour.days} 天 · {ntd(tour.price)}</p>
            <Button className="mt-3" onClick={() => edit(tour)}>編輯</Button>
          </Card>
        ))}
      </div>
      <TourForm
        editingId={editingId}
        draft={draft}
        setDraft={setDraft}
        onSaved={(id) => setEditingId(id)}
        onClear={() => { setEditingId(null); setDraft(empty); }}
      />
    </main>
  );
}

export default function AdminToursPage() {
  return <AdminGate><AdminToursBody /></AdminGate>;
}
