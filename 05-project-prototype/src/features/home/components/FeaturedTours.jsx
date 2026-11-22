import Typography from '@mui/material/Typography';
import TourCard from '../../tours/components/TourCard.jsx';

export default function FeaturedTours({ tours }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <Typography variant="h2">熱門行程</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        這幾趟最常被選走。價格為每人，以新台幣計。
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </section>
  );
}
