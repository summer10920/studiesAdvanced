import { useMemo, useState } from 'react';

export default function MemoDemo() {
  const [text, setText] = useState('');
  const [star, setStar] = useState(3);
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
      <p>星等 {star}</p>
      <button
        type="button"
        className="w-fit rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setStar(Math.max(1, star - 1))}
      >
        減一顆
      </button>
      <button
        type="button"
        className="w-fit rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setStar(Math.min(5, star + 1))}
      >
        加一顆
      </button>
      <p>評語 {label}</p>
    </section>
  );
}
