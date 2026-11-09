import { useMemo, useState } from 'react';

export default function MemoDemo() {
  const [text, setText] = useState('');
  const [star, setStar] = useState(5);
  const label = useMemo(() => {
    console.log('計算中');
    return star >= 4 ? '值得推薦' : '普通';
  }, [star]);

  return (
    <section className="grid max-w-sm gap-3">
      <label className="grid gap-1">
        留言
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="rounded border px-2 py-1"
        />
      </label>
      <p>輸入字數 {text.length}</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            className="text-2xl text-amber-500"
            onClick={() => setStar(n)}
          >
            {n <= star ? '★' : '☆'}
          </button>
        ))}
      </div>
      <p>星等 {star}</p>
      <p>評語 {label}</p>
    </section>
  );
}
