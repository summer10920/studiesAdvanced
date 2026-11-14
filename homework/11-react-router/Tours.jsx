import { Link, useLoaderData, useSearchParams } from 'react-router';
import { getTours } from './data.js';

const themes = ['城市', '山海', '海岸', '古都', '離島', '日本'];

// 題目二：loader 在頁面渲染前先取得資料，回傳值交給 useLoaderData
export const loader = async () => ({ tours: await getTours() });

// 題目三：主題寫在網址的查詢參數，列表依網址顯示
export default function Tours() {
  const { tours } = useLoaderData();
  const [params] = useSearchParams();
  const theme = params.get('theme'); // 沒有這個參數時是 null，表示全部
  const visible = theme ? tours.filter((tour) => tour.theme === theme) : tours;

  const onClass = 'rounded bg-teal-800 px-3 py-1 text-white';
  const offClass = 'rounded border border-stone-400 px-3 py-1';

  return (
    <section>
      <h1 className="text-2xl font-bold">行程</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link to="/tours" className={theme ? offClass : onClass}>
          全部
        </Link>
        {themes.map((item) => (
          <Link
            key={item}
            to={`/tours?theme=${encodeURIComponent(item)}`}
            className={item === theme ? onClass : offClass}
          >
            {item}
          </Link>
        ))}
      </div>
      <ul className="mt-4 grid gap-2">
        {visible.map((tour) => (
          <li key={tour.id}>
            <Link to={`/tours/${tour.id}`} className="text-teal-800 underline">
              {tour.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
