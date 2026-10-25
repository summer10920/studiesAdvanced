// TODO: 講義「陣列刪除」。換你試試：刪除改成只留被點到的那一筆，其他筆都拿掉。按花蓮山海三日之後，清單只剩花蓮山海三日。
import { useState } from 'react';

const initial = [
  { id: 'taipei', title: '台北城市漫遊' },
  { id: 'hualien', title: '花蓮山海三日' },
  { id: 'kyoto', title: '京都紅葉散步' },
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
          <span>{item.title}</span>
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
