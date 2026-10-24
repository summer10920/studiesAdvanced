// TODO: 講義「陣列修改」。換你試試：同一顆按鈕把紙的名稱也改成「信紙」。價格仍是 45。
import { useState } from 'react';

const initial = [
  { id: 'pen', name: '筆', price: 25 },
  { id: 'paper', name: '紙', price: 40 },
  { id: 'ruler', name: '尺', price: 15 },
];

export default function EditDemo() {
  const [items, setItems] = useState(initial);

  const onEdit = () => {
    setItems((current) =>
      current.map((item) =>
        item.id === 'paper' ? { ...item, price: 45 } : item,
      ),
    );
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onEdit}
      >
        紙改價
      </button>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li key={item.id}>
            {item.name} {item.price}
          </li>
        ))}
      </ul>
    </section>
  );
}
