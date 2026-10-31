import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getItems } from '../api/fake-api.js';

export default function DetailPage() {
  const { id } = useParams();
  const [status, setStatus] = useState('loading');
  const [item, setItem] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const items = await getItems();
        setItem(items.find((row) => String(row.id) === id) ?? null);
        setStatus('ready');
      } catch {
        setStatus('error');
      }
    };
    load();
  }, [id]);

  if (status === 'loading') return <p>載入中</p>;
  if (status === 'error') return <p>讀取失敗</p>;
  if (!item) return <p>找不到這筆</p>;

  return (
    <article>
      <h1 className="text-2xl font-bold">{item.title}</h1>
      <p className="mt-2">
        {item.place} {item.days} 天 {item.price}
      </p>
    </article>
  );
}
