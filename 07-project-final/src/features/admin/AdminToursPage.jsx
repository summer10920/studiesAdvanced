import { useEffect } from 'react';
import { Link } from 'react-router';
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
import LoadGate from '../../LoadGate.jsx';
import { ntd } from '../../format.js';
import { useTours } from '../../useAsync.js';

function AdminToursBody() {
  const { data, loading, error } = useTours();
  const tours = data ?? [];
  useEffect(() => { document.title = '行程管理 · 洛奇旅行'; }, []);
  if (loading || error) return <LoadGate loading={loading} error={error} />;

  return (
    <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <p className="font-bold text-action">管理員</p>
      <Typography variant="h1" className="mt-2">行程管理</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">清單來自 Firestore。這一章只讀，不在後台新增或修改。還沒有資料時，先寫入種子。</p>
      <AdminTabs />
      <Button className="mt-4" component={Link} to="/seed" variant="outlined">寫入種子</Button>
      {tours.length ? (
        <>
          <TableContainer elevation={0} className="rounded-card bg-white shadow-card mt-8 hidden overflow-x-auto md:block">
            <Table>
              <TableHead>
                <TableRow>
                  {['標題', '地區', '主題', '天數', '價格'].map((label) => <TableCell key={label} className="px-4 py-3">{label}</TableCell>)}
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
              </Card>
            ))}
          </div>
        </>
      ) : <p className="mt-8 text-base text-muted">還沒有行程。</p>}
    </main>
  );
}

export default function AdminToursPage() {
  return <AdminGate><AdminToursBody /></AdminGate>;
}
