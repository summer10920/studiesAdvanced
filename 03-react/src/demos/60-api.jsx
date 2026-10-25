// TODO: 講義「API 模組」。換你試試：在示範裡加一顆按鈕，按下呼叫 `getPost(1)`，把標題寫進訊息。清單留著。
import { useEffect, useState } from 'react';
import { getLocalItems } from '../api/items.js';

export default function ApiDemo() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('載入中');

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        setItems(await getLocalItems(controller.signal));
        setMessage('');
      } catch (error) {
        if (error.name === 'AbortError') return;
        setMessage('讀取失敗');
      }
    };
    load();
    return () => controller.abort();
  }, []);

  if (message) return <p>{message}</p>;

  return (
    <ul className="grid gap-2">
      {items.map((item) => (
        <li key={item.id}>
          {item.title} {item.price}
        </li>
      ))}
    </ul>
  );
}
