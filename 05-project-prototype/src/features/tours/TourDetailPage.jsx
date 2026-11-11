import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Typography from '@mui/material/Typography';
import BookingCard from './components/BookingCard.jsx';
import FareBox from './components/FareBox.jsx';
import Gallery from './components/Gallery.jsx';
import Itinerary from './components/Itinerary.jsx';
import MobileBookingBar from './components/MobileBookingBar.jsx';
import MobileDepartures from './components/MobileDepartures.jsx';
import TourHeader from './components/TourHeader.jsx';
import TourHighlights from './components/TourHighlights.jsx';
import NotFoundPage from '../../pages/NotFoundPage.jsx';
import { useStore } from '../../store-context.js';

export default function TourDetailPage() {
  const { id } = useParams();
  const { tours, bookings } = useStore();
  const tour = tours.find((item) => item.id === id);
  const [departureId, setDepartureId] = useState(tour?.departures[0]?.id ?? '');
  useEffect(() => {
    document.title = tour
      ? `${tour.title} · 洛奇旅行`
      : '找不到頁面 · 洛奇旅行';
  }, [tour]);
  if (!tour) return <NotFoundPage />;

  const selected =
    tour.departures.find((item) => item.id === departureId) ??
    tour.departures[0];
  const bookTo = `/booking?tourId=${tour.id}&departureId=${selected.id}`;

  return (
    <main
      id="content"
      className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 pb-28 sm:px-6 md:py-24 lg:pb-24"
    >
      <div className="lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(20rem,24rem)] lg:items-start lg:gap-10">
        <div className="min-w-0">
          <TourHeader tour={tour} />
          <Gallery images={tour.images} title={tour.title} />
          <TourHighlights intro={tour.intro} highlights={tour.highlights} />
          <Itinerary days={tour.itinerary} />
          <FareBox includes={tour.includes} excludes={tour.excludes} />
          <MobileDepartures tour={tour} bookings={bookings} />
          <Typography variant="h2" className="mt-14">
            取消與退款
          </Typography>
          <p className="mt-3 text-base leading-relaxed text-muted">
            出團前以 email
            確認。未成行全額退回。成行後若要改期，請來信或來電，由我們為你調整。常見問題也寫在關於頁。
          </p>
        </div>
        <BookingCard
          tour={tour}
          bookings={bookings}
          selected={selected}
          onSelect={setDepartureId}
          bookTo={bookTo}
        />
      </div>
      <MobileBookingBar price={tour.price} bookTo={bookTo} />
    </main>
  );
}
