import { useEffect, useState } from 'react';

export default function LoopDemo() {
  const [place, setPlace] = useState('台北城市漫遊');

  useEffect(() => {
    const previous = document.title;
    document.title = place;
    return () => {
      document.title = previous;
    };
  }, [place]);

  return (
    <section>
      <p>分頁標題 {place}</p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setPlace('花蓮山海三日')}
      >
        改成花蓮山海三日
      </button>
    </section>
  );
}
