import { data, redirect, useLoaderData } from 'react-router';
import Typography from '@mui/material/Typography';
import BookingForm from './components/BookingForm.jsx';
import BookingSteps from './components/BookingSteps.jsx';
import BookingSummary from './components/BookingSummary.jsx';
import { createOrder, getTour } from '../../api.js';
import { MissingFirebase } from '../../AccessNotice.jsx';
import { requireUser } from '../../auth.js';
import { missingFirebaseMessage } from '../../firebase.js';

export const loader = async ({ request }) => {
  const gate = await requireUser(request);
  if (!gate.firebaseReady)
    return { firebaseReady: false, tour: null, departure: null, user: null };
  const url = new URL(request.url);
  const tour = await getTour(
    url.searchParams.get('tourId') || 'hualien-taroko',
  );
  const departure =
    tour?.departures?.find(
      (item) => item.id === url.searchParams.get('departureId'),
    ) || tour?.departures?.[0];
  if (!tour || !departure) throw data('找不到頁面', { status: 404 });
  return { firebaseReady: true, tour, departure, user: gate.user };
};

export const action = async ({ request }) => {
  const gate = await requireUser(request);
  if (!gate.firebaseReady) return { error: missingFirebaseMessage };
  const form = await request.formData();
  const phone = String(form.get('phone') ?? '').trim();
  const name = gate.user.displayName || '';
  const email = gate.user.email || '';
  if (!name.trim() || !email.includes('@') || !phone)
    return {
      error:
        name.trim() && email.includes('@')
          ? '請填電話'
          : '請確認 Google 帳號帶有姓名與 email，並填電話',
    };
  const row = await createOrder({
    uid: gate.user.uid,
    tourId: String(form.get('tourId')),
    tourTitle: String(form.get('tourTitle')),
    departureId: String(form.get('departureId')),
    date: String(form.get('date')),
    people: Number(form.get('people')),
    name: name.trim(),
    email: email.trim(),
    phone,
    subtotal: Number(form.get('subtotal')),
  });
  return redirect(`/booking/${row.id}`);
};

export default function BookingPage() {
  const { firebaseReady: ready, tour, departure, user } = useLoaderData();
  if (!ready) return <MissingFirebase />;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 md:py-24">
      <title>報名 · 洛奇旅行</title>
      <BookingSteps activeStep={1} />
      <Typography variant="h1">報名</Typography>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
        姓名與 email 來自 Google 帳號。請留下電話，送出後會寫進訂單。
      </p>
      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,22rem)]">
        <BookingForm tour={tour} departure={departure} user={user} />
        <BookingSummary tour={tour} departure={departure} />
      </div>
    </main>
  );
}
