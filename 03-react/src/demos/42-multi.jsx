// TODO: 講義「多個狀態」。換你試試：再加一個狀態 `city`，起始值台北，以及一顆按鈕把它改成台南。名稱與件數那兩行更新留著。
import { useState } from 'react';

export default function MultiDemo() {
  const [name, setName] = useState('筆');
  const [count, setCount] = useState(1);

  return (
    <section>
      <p>
        {name} × {count}
      </p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setCount((value) => value + 1)}
      >
        加一件
      </button>
      <button
        type="button"
        className="ml-2 rounded bg-stone-200 px-3 py-1"
        onClick={() => setName('紙')}
      >
        改成紙
      </button>
    </section>
  );
}
