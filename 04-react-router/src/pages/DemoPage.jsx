import { Link, useNavigate, useParams } from 'react-router';
import { demos, findDemo } from '../demoRegistry.js';

/**
 * 單則示範。useParams 的 slug 對上 demoRegistry 才畫出 Component。
 * 上一則／下一則用 navigate 改網址。
 */
export default function DemoPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const demo = findDemo(slug);
  const index = demos.findIndex((item) => item.slug === slug);

  if (!demo) {
    return (
      <section>
        <h1 className="text-2xl font-bold">沒有這個示範</h1>
        <p className="mt-2">
          <Link className="text-teal-800 underline" to="/">
            回總覽
          </Link>
        </p>
      </section>
    );
  }

  const prev = demos[index - 1];
  const next = demos[index + 1];
  const View = demo.Component;

  return (
    <article>
      <p className="text-xs text-stone-500">{demo.group}</p>
      <h1 className="text-lg font-bold">
        {demo.id} {demo.title}
        {demo.optional ? (
          <span className="ml-2 text-xs font-normal text-stone-400">選讀</span>
        ) : null}
      </h1>
      <p className="mt-1 font-mono text-xs text-stone-400">{demo.slug}</p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="rounded bg-stone-200 px-3 py-1 text-sm disabled:opacity-40"
          disabled={!prev}
          onClick={() => prev && navigate('/demos/' + prev.slug)}
        >
          上一個
        </button>
        <button
          type="button"
          className="rounded bg-stone-200 px-3 py-1 text-sm disabled:opacity-40"
          disabled={!next}
          onClick={() => next && navigate('/demos/' + next.slug)}
        >
          下一個
        </button>
      </div>
      <div className="mt-6">
        <View />
      </div>
    </article>
  );
}
