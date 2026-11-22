import { useLoaderData } from 'react-router';
import FeaturedTours from './components/FeaturedTours.jsx';
import HeroSearch from './components/HeroSearch.jsx';
import HeroSlider from './components/HeroSlider.jsx';
import IntroBanner from './components/IntroBanner.jsx';
import ReasonSection from './components/ReasonSection.jsx';
import ReviewSection from './components/ReviewSection.jsx';
import ThemeSection from './components/ThemeSection.jsx';
import { getTours } from '../../store.js';

export const loader = () => ({ tours: getTours() });

export default function HomePage() {
  const { tours } = useLoaderData();
  const featured = tours.filter((tour) => tour.featured);

  return (
    <main>
      <title>洛奇旅行</title>
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
