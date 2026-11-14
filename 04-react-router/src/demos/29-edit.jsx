import { useState } from 'react';

const initial = [
  { id: 'taipei', title: '台北城市漫遊', price: 12800 },
  { id: 'hualien', title: '花蓮山海三日', price: 15900 },
  { id: 'kyoto', title: '京都紅葉散步', price: 42800 },
];

export default function EditDemo() {
  const [items, setItems] = useState(initial);

  const onEdit = () => {
    setItems((current) =>
      current.map((item) =>
        item.id === 'hualien' ? { ...item, price: 16800 } : item,
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
        花蓮改價
      </button>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li key={item.id}>
            {item.title} {item.price}
          </li>
        ))}
      </ul>
    </section>
  );
}
