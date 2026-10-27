import { useState } from 'react';
import { useFilteredItems } from '../hooks/useFilteredItems.js';

export default function FilterHookDemo() {
  const [minPrice, setMinPrice] = useState(15000);
  const { status, items } = useFilteredItems(minPrice);

  return (
    <section className="grid gap-3">
      <p>最低價格 {minPrice}</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded bg-teal-800 px-3 py-1 text-white"
          onClick={() => setMinPrice(0)}
        >
          全部
        </button>
        <button
          type="button"
          className="rounded bg-teal-800 px-3 py-1 text-white"
          onClick={() => setMinPrice(15000)}
        >
          15000 起
        </button>
        <button
          type="button"
          className="rounded bg-teal-800 px-3 py-1 text-white"
          onClick={() => setMinPrice(20000)}
        >
          20000 起
        </button>
      </div>
      {status === 'loading' && <p>載入中</p>}
      {status === 'error' && <p>讀取失敗</p>}
      {status === 'ready' && (
        <ul className="grid gap-2">
          {items.map((item) => (
            <li key={item.id}>
              {item.title} {item.price}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
