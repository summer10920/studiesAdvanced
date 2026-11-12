import { useSearchParams } from 'react-router';
import Typography from '@mui/material/Typography';
import BookingForm from './components/BookingForm.jsx';
import BookingSteps from './components/BookingSteps.jsx';
import BookingSummary from './components/BookingSummary.jsx';
import NotFoundPage from '../../pages/NotFoundPage.jsx';
import { useStore } from '../../store-context.js';

export default function BookingPage() {
  const { tours } = useStore();
  const [params] = useSearchParams();
  const tour = tours.find(
    (item) => item.id === (params.get('tourId') || 'hualien-taroko'),
  );
  const departure =
    tour?.departures.find((item) => item.id === params.get('departureId')) ||
    tour?.departures[0];
  if (!tour || !departure) return <NotFoundPage />;

  return (
    <main
      id="content"
      className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24"
    >
      <title>報名 · 洛奇旅行</title>
      <BookingSteps activeStep={1} />
      <Typography variant="h1">報名</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        這一章先用範例資料畫出姓名與 email。成品會用 Google
        帳號帶入。請留下電話，我們會用 email 確認。
      </p>
      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,22rem)]">
        <BookingForm tour={tour} departure={departure} />
        <BookingSummary tour={tour} departure={departure} />
      </div>
    </main>
  );
}
