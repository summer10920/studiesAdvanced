import { useLoaderData } from 'react-router';
import Alert from '@mui/material/Alert';
import FeaturedTours from './components/FeaturedTours.jsx';
import HeroSearch from './components/HeroSearch.jsx';
import HeroSlider from './components/HeroSlider.jsx';
import IntroBanner from './components/IntroBanner.jsx';
import ReasonSection from './components/ReasonSection.jsx';
import ReviewSection from './components/ReviewSection.jsx';
import ThemeSection from './components/ThemeSection.jsx';
import { listTours } from '../../api.js';
import { MissingFirebase } from '../../AccessNotice.jsx';
import { firebaseReady } from '../../firebase.js';

export const loader = async () => {
  if (!firebaseReady) return { firebaseReady: false, tours: [] };
  return { firebaseReady: true, tours: await listTours() };
};

export default function HomePage() {
  const { firebaseReady: ready, tours } = useLoaderData();
  const featured = tours.filter((tour) => tour.featured);
  if (!ready) return <MissingFirebase />;

  return (
    <main>
      <title>洛奇旅行</title>
      {tours.length ? null : (
        <div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6">
          <Alert severity="info">還沒有行程。請先打開 /seed 寫入種子。</Alert>
        </div>
      )}
      <HeroSlider slides={featured.length ? featured : tours.slice(0, 4)} />
      <HeroSearch />
      <IntroBanner />
      <FeaturedTours tours={featured} />
      <ThemeSection />
      <ReasonSection />
      <ReviewSection />
    </main>
  );
}
