import { useLoaderData, useSearchParams } from 'react-router';
import Typography from '@mui/material/Typography';
import TourCard from './components/TourCard.jsx';
import TourEmpty from './components/TourEmpty.jsx';
import TourFilters from './components/TourFilters.jsx';
import { listTours } from '../../api.js';
import { MissingFirebase } from '../../AccessNotice.jsx';
import { firebaseReady } from '../../firebase.js';
import { matchPrice } from '../../format.js';

export const loader = async () => {
  if (!firebaseReady) return { firebaseReady: false, tours: [] };
  return { firebaseReady: true, tours: await listTours() };
};

export default function ToursPage() {
  const { firebaseReady: ready, tours } = useLoaderData();
  const [params, setParams] = useSearchParams();

  const region = params.get('region') ?? '';
  const days = params.get('days') ?? '';
  const price = params.get('price') ?? '';
  const theme = params.get('theme') ?? '';
  const sort = params.get('sort') || 'price-asc';
  const list = tours.filter(
    (tour) =>
      (!region || tour.region === region) &&
      (!days || String(tour.days) === days) &&
      (!theme || tour.theme === theme) &&
      matchPrice(tour.price, price),
  );
  const rank = {
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    'days-asc': (a, b) => a.days - b.days || a.price - b.price,
  };
  const visible = [...list].sort(rank[sort] || rank['price-asc']);
  if (!ready) return <MissingFirebase />;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <title>行程 · 洛奇旅行</title>
      <Typography variant="h1">行程</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        依地區、天數與預算挑選。價格為每人，以新台幣計。
      </p>
      <TourFilters />
      <div id="tour-list">
        {visible.length ? (
          <>
            <Typography variant="h2" className="mt-10">
              {visible.length} 筆行程
            </Typography>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((tour) => (
                <TourCard key={tour.id} tour={tour} showTheme />
              ))}
            </div>
          </>
        ) : (
          <TourEmpty
            onClear={() => setParams(new URLSearchParams())}
            message={
              tours.length
                ? '換一個地區或天數，或清掉價格條件。'
                : '還沒有行程。請先打開 /seed 寫入種子。'
            }
          />
        )}
      </div>
    </main>
  );
}
