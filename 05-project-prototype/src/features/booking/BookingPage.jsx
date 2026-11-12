import { data, redirect, useLoaderData } from 'react-router';
import Typography from '@mui/material/Typography';
import BookingForm from './components/BookingForm.jsx';
import BookingSteps from './components/BookingSteps.jsx';
import BookingSummary from './components/BookingSummary.jsx';
import { createBooking, getTour } from '../../store.js';

export const loader = ({ request }) => {
  const url = new URL(request.url);
  const tour = getTour(url.searchParams.get('tourId') || 'hualien-taroko');
  const departure =
    tour?.departures.find(
      (item) => item.id === url.searchParams.get('departureId'),
    ) || tour?.departures[0];
  if (!tour || !departure) throw data('找不到頁面', { status: 404 });
  return { tour, departure };
};

export const action = async ({ request }) => {
  const form = await request.formData();
  const phone = String(form.get('phone') ?? '').trim();
  if (!phone) return { error: '請填電話，此欄必填' };
  const row = createBooking({
    tourId: String(form.get('tourId')),
    tourTitle: String(form.get('tourTitle')),
    departureId: String(form.get('departureId')),
    date: String(form.get('date')),
    people: Number(form.get('people')),
    name: String(form.get('name')),
    email: String(form.get('email')),
    phone,
    subtotal: Number(form.get('subtotal')),
  });
  return redirect(`/booking/${row.id}`);
};

export default function BookingPage() {
  const { tour, departure } = useLoaderData();

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
