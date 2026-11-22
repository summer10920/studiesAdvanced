import { useLoaderData } from 'react-router';
import { getBookings, getTours } from './data.js';

// 同時讀報名與行程，才能把行程編號換成標題
export const loader = async () => {
  const [bookings, tours] = await Promise.all([getBookings(), getTours()]);
  return {
    bookings: bookings.map((booking) => ({
      ...booking,
      tourTitle:
        tours.find((tour) => tour.id === booking.tourId)?.title ??
        booking.tourId,
    })),
  };
};

export default function Bookings() {
  const { bookings } = useLoaderData();

  return (
    <section>
      <h1 className="text-2xl font-bold">報名清單</h1>
      {bookings.length === 0 ? (
        <p className="mt-4">目前沒有報名</p>
      ) : (
        <ul className="mt-4 grid gap-2">
          {bookings.map((booking) => (
            <li key={booking.id}>
              {booking.name}，{booking.tourTitle}，{booking.people} 人
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
