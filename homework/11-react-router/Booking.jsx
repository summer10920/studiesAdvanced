import { Form, redirect, useLoaderData, useNavigation } from 'react-router';
import { addBooking, getTours } from './data.js';

// 題目五：報名頁需要行程清單給下拉選單
export const loader = async () => ({ tours: await getTours() });

// 讀表單、儲存，成功後 redirect 到報名清單
export const action = async ({ request }) => {
  const form = await request.formData();
  await addBooking({
    name: String(form.get('name') ?? '').trim(),
    tourId: String(form.get('tourId') ?? ''),
    people: Number(form.get('people') ?? 1),
  });
  return redirect('/bookings');
};

export default function Booking() {
  const { tours } = useLoaderData();
  const navigation = useNavigation();
  // action 執行中就是 submitting，這段時間停用按鈕
  const submitting = navigation.state === 'submitting';

  return (
    <section>
      <h1 className="text-2xl font-bold">報名</h1>
      <Form method="post" className="mt-4 grid max-w-sm gap-3">
        <input
          name="name"
          required
          className="rounded border px-2 py-1"
          placeholder="姓名"
        />
        <select name="tourId" className="rounded border px-2 py-1">
          {tours.map((tour) => (
            <option key={tour.id} value={tour.id}>
              {tour.title}
            </option>
          ))}
        </select>
        <input
          name="people"
          type="number"
          min="1"
          defaultValue="1"
          className="rounded border px-2 py-1"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-teal-800 px-3 py-1 text-white disabled:opacity-40"
        >
          {submitting ? '送出中' : '送出報名'}
        </button>
      </Form>
    </section>
  );
}
