// TODO: 講義「空資料」。換你試試：網址改回 `/data/items.json`。應改看到三個標題，而不是沒有資料。
import { useEffect, useState } from 'react';

export default function EmptyLoadDemo() {
  const [status, setStatus] = useState('loading');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/data/empty.json');
        if (!response.ok) throw new Error(String(response.status));
        setItems(await response.json());
        setStatus('ready');
      } catch {
        setItems([]);
        setStatus('error');
      }
    };
    load();
  }, []);

  if (status === 'loading') return <p>載入中</p>;
  if (status === 'error') return <p>讀取失敗</p>;
  if (items.length === 0) return <p>沒有資料</p>;

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
