import { Link, useNavigate, useParams } from 'react-router';
import { demos, topics } from '../data/catalog.js';

/**
 * 單則筆記。useParams 的 slug 是字串，和目錄的 slug 相同才畫出 Component。
 * 對不到時留在這一頁，並用 Link 回總覽。上一則與下一則跟著目錄陣列，用 useNavigate 改網址；第一則與最後一則的按鈕停用。
 */
export default function DemoPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const demo = demos.find((item) => item.slug === slug);
  const index = demos.findIndex((item) => item.slug === slug);

  if (!demo) {
    return (
      <section>
        <h1 className="text-2xl font-bold">沒有這則筆記</h1>
        <p className="mt-2">
          <Link className="text-teal-800 underline" to="/">
            回目錄
          </Link>
        </p>
      </section>
    );
  }

  const topic = topics.find((item) => item.id === demo.topic);
  const prev = demos[index - 1];
  const next = demos[index + 1];
  const View = demo.Component;

  return (
    <article>
      <p className="text-sm text-stone-500">{topic ? topic.title : ''}</p>
      <h1 className="mt-1 text-2xl font-bold">
        {demo.slug} {demo.title}
      </h1>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="rounded bg-stone-200 px-3 py-1 text-sm disabled:opacity-40"
          disabled={!prev}
          onClick={() => prev && navigate('/demos/' + prev.slug)}
        >
          上一則
        </button>
        <button
          type="button"
          className="rounded bg-stone-200 px-3 py-1 text-sm disabled:opacity-40"
          disabled={!next}
          onClick={() => next && navigate('/demos/' + next.slug)}
        >
          下一則
        </button>
      </div>
      <div className="mt-6">
        <View />
      </div>
    </article>
  );
}
