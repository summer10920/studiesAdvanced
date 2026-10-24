// TODO: 講義「渲染時計算」。換你試試：單價改成 40。兩支時應顯示共 80。不要為總價加 `useState`。
import { useState } from 'react';

export default function DeriveDemo() {
  const [count, setCount] = useState(2);
  const price = 25;
  const total = price * count;

  return (
    <section>
      <p>
        {count} 支，共 {total}
      </p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setCount((value) => value + 1)}
      >
        加一支
      </button>
    </section>
  );
}
