// TODO: 講義「狀態快照」。換你試試：在 `console.log` 後面再印一次 `count + 1`。畫面仍只加 1，Console 第二行應是 1。
import { useState } from 'react';

export default function SnapshotDemo() {
  const [count, setCount] = useState(0);

  const onAdd = () => {
    setCount(count + 1);
    setCount(count + 1);
    console.log(count);
  };

  return (
    <section>
      <p>次數 {count}</p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onAdd}
      >
        加一
      </button>
    </section>
  );
}
