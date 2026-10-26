// TODO: 講義「API 模組」。換你試試：把 `getItem(1)` 改成 `getItem(2)`。清單仍是本機三筆，訊息換成另一篇標題。
import { useEffect, useState } from 'react';
import {
  createItem,
  deleteItem,
  getItem,
  getItems,
  updateItem,
} from '../api/items-api.js';

export default function ItemsDemo() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('載入中');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        setItems(await getItems(controller.signal));
        setMessage('');
        setReady(true);
      } catch (error) {
        if (error.name === 'AbortError') return;
        setMessage('讀取失敗');
      }
    };
    load();
    return () => controller.abort();
  }, []);

  const onRead = async () => {
    try {
      const item = await getItem(1);
      setMessage(item.title);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const onCreate = async () => {
    try {
      const created = await createItem({
        title: '新行程',
        body: '台北城市漫遊',
        userId: 1,
      });
      setMessage(created.id + ' ' + created.title);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const onUpdate = async () => {
    try {
      const updated = await updateItem(1, {
        id: 1,
        title: '更新後的標題',
        body: '內容',
        userId: 1,
      });
      setMessage(updated.title);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const onDelete = async () => {
    try {
      const removed = await deleteItem(1);
      setMessage(removed ? '已刪除' : '刪除失敗');
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (!ready) return <p>{message}</p>;

  return (
    <section className="grid gap-2">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded bg-teal-800 px-3 py-1 text-white"
          onClick={onRead}
        >
          讀一筆
        </button>
        <button
          type="button"
          className="rounded bg-teal-800 px-3 py-1 text-white"
          onClick={onCreate}
        >
          新增
        </button>
        <button
          type="button"
          className="rounded bg-teal-800 px-3 py-1 text-white"
          onClick={onUpdate}
        >
          更新
        </button>
        <button
          type="button"
          className="rounded bg-teal-800 px-3 py-1 text-white"
          onClick={onDelete}
        >
          刪除
        </button>
      </div>
      <p>{message}</p>
      <ul className="grid gap-2">
        {items.map((item) => (
          <li key={item.id}>
            {item.title} {item.price}
          </li>
        ))}
      </ul>
    </section>
  );
}
