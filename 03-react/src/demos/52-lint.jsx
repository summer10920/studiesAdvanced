// TODO: 講義「漏寫依賴」。換你試試：把依賴改成 [count]。按下加一後 Console 應跟著印出新的次數。改完再執行 pnpm lint，這一則少依賴的警告會消失。
import { useEffect, useState } from 'react';

export default function LintDemo() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('次數', count);
  }, []);

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
