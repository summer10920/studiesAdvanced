import {
  data,
  isRouteErrorResponse,
  Link,
  useLoaderData,
  useRouteError,
} from 'react-router';
import { getTour } from './data.js';

// 題目四：params.tourId 是路徑上的編號；找不到就 throw data(...)，由 errorElement 接手
export const loader = async ({ params }) => {
  const tour = await getTour(params.tourId);
  if (!tour) throw data('找不到這個行程', { status: 404 });
  return { tour };
};

export default function TourDetail() {
  const { tour } = useLoaderData();

  return (
    <section>
      <h1 className="text-2xl font-bold">{tour.title}</h1>
      <p className="mt-2">
        <span>{tour.days} 天</span>
        <span className="ml-4">NT${tour.price}</span>
      </p>
      <p className="mt-4">
        <Link to="/tours" className="text-teal-800 underline">
          回行程列表
        </Link>
      </p>
    </section>
  );
}

// 掛在詳情路由的 errorElement：版型仍在，只有主區換成這個畫面
export function TourMissing() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error) ? error.data : '發生錯誤';

  return (
    <section>
      <h1 className="text-2xl font-bold">{String(message)}</h1>
      <p className="mt-4">
        <Link to="/tours" className="text-teal-800 underline">
          回行程列表
        </Link>
      </p>
    </section>
  );
}
