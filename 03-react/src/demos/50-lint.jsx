// TODO: 講義「漏寫依賴」。換你試試：暫時把依賴改成空陣列，執行 `pnpm lint`，讀警告裡的 count。看完再改回 `[count]`。
import { useEffect, useState } from 'react';

export default function LintDemo() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('次數', count);
  }, [count]);

  return (
    <section>
      <p>次數 {count}</p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setCount((value) => value + 1)}
      >
        加一
      </button>
    </section>
  );
}
