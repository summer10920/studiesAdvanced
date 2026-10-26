import { useState } from 'react';

export default function RulesDemo() {
  const [name, setName] = useState('台北城市漫遊');
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
        onClick={() => setName('花蓮山海三日')}
      >
        改成花蓮山海三日
      </button>
    </section>
  );
}
