// TODO: 講義「陣列刪除」。換你試試：刪除改成只留被點到的那一筆，其他筆都拿掉。按紙之後，清單只剩紙。
import { useState } from 'react';

const initial = [
  { id: 'pen', name: '筆' },
  { id: 'paper', name: '紙' },
  { id: 'ruler', name: '尺' },
];

export default function RemoveDemo() {
  const [items, setItems] = useState(initial);

  const onRemove = (id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  return (
    <ul className="grid gap-2">
      {items.map((item) => (
        <li key={item.id} className="flex gap-2">
          <span>{item.name}</span>
          <button
            type="button"
            className="rounded bg-stone-200 px-2"
            onClick={() => onRemove(item.id)}
          >
            刪除
          </button>
        </li>
      ))}
    </ul>
  );
}
