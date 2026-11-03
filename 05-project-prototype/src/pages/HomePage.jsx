import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import HeroSearch from '../components/HeroSearch.jsx';
import HeroSlider from '../components/HeroSlider.jsx';
import ReasonList from '../components/ReasonList.jsx';
import ReviewList from '../components/ReviewList.jsx';
import ThemeGrid from '../components/ThemeGrid.jsx';
import TourCard from '../components/TourCard.jsx';
import { useStore } from '../store.jsx';

export default function HomePage() {
  const { tours } = useStore();
  const featured = tours.filter((tour) => tour.featured);
  useEffect(() => { document.title = '洛奇旅行'; }, []);

  return (
    <main id="content">
      <HeroSlider slides={featured.length ? featured : tours.slice(0, 4)} />
      <div className="relative z-20 mx-auto mt-8 w-full max-w-6xl px-4 sm:px-6 lg:-mt-20">
        <HeroSearch />
      </div>
      <section className="mt-12 bg-ink text-white md:mt-20">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <Typography variant="h2" className="text-balance text-4xl leading-snug text-white md:text-5xl"><span className="whitespace-nowrap">把日子排鬆，</span><br /><span className="whitespace-nowrap">把路走慢。</span></Typography>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foam">每團最多 8 人。地名寫清楚，一天只排一段路，下午留給自己。京都五日不含國際機票。</p>
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24" aria-labelledby="featured-title">
        <Typography id="featured-title" variant="h2">熱門行程</Typography>
        <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">這幾趟最常被選走。價格為每人，以新台幣計。</p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {featured.map((tour) => <TourCard key={tour.id} tour={tour} />)}
        </div>
      </section>
      <section className="bg-mist" aria-labelledby="theme-title">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <Typography id="theme-title" variant="h2">依主題找路</Typography>
          <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">城市、海岸、山海、古都、離島，或飛一趟京都。</p>
          <ThemeGrid />
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24" aria-labelledby="reason-title">
        <Typography id="reason-title" variant="h2">為什麼選我們</Typography>
        <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">人少、不排滿、盡量住同一間飯店。</p>
        <ReasonList />
      </section>
      <section className="bg-foam" aria-labelledby="review-title">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <Typography id="review-title" variant="h2">旅客怎麼說</Typography>
          <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">出發回來之後，旅客留下的話。</p>
          <ReviewList />
        </div>
      </section>
    </main>
  );
}
