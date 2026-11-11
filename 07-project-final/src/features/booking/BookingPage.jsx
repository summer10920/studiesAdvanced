import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import Typography from '@mui/material/Typography';
import BookingForm from './components/BookingForm.jsx';
import BookingSteps from './components/BookingSteps.jsx';
import BookingSummary from './components/BookingSummary.jsx';
import MemberGate from './components/MemberGate.jsx';
import LoadGate from '../../LoadGate.jsx';
import NotFoundPage from '../../pages/NotFoundPage.jsx';
import { useTours } from '../../useAsync.js';

function BookingBody() {
  const { data, loading, error } = useTours();
  const tours = data ?? [];
  const [params] = useSearchParams();
  const tour = tours.find(
    (item) => item.id === (params.get('tourId') || 'hualien-taroko'),
  );
  const departure =
    tour?.departures.find((item) => item.id === params.get('departureId')) ||
    tour?.departures[0];
  useEffect(() => {
    document.title = '報名 · 洛奇旅行';
  }, []);
  if (loading || error) return <LoadGate loading={loading} error={error} />;
  if (!tour || !departure) return <NotFoundPage />;

  return (
    <main
      id="content"
      className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24"
    >
      <BookingSteps activeStep={1} />
      <Typography variant="h1">報名</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        姓名與 email 來自 Google 帳號。請留下電話，送出後會寫進訂單。
      </p>
      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,22rem)]">
        <BookingForm tour={tour} departure={departure} />
        <BookingSummary tour={tour} departure={departure} />
      </div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <MemberGate>
      <BookingBody />
    </MemberGate>
  );
}
