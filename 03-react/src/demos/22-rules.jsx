// TODO: 講義「Hooks 規則」。換你試試：把 `setStock(0)` 改成更新函式，讓庫存減 1。按兩次應變成補貨中。Hook 仍留在最上面。
import { useState } from 'react';

export default function RulesDemo() {
  const [name, setName] = useState('筆');
  const [stock, setStock] = useState(2);

  return (
    <section>
      <p>{stock > 0 ? name + ' 有庫存' : name + ' 補貨中'}</p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setStock(0)}
      >
        設為缺貨
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
