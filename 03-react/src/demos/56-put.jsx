// TODO: 講義「PUT」。換你試試：標題改成「已改標題」，並在 Console 再印一次 `response.ok`。應是 true。
import { useState } from 'react';

export default function PutDemo() {
  const [title, setTitle] = useState('尚未更新');

  const onUpdate = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: 1,
            title: '更新後的標題',
            body: '內容',
            userId: 1,
          }),
        },
      );
      if (!response.ok) throw new Error(String(response.status));
      const updated = await response.json();
      console.log(response.status);
      setTitle(updated.title);
    } catch (error) {
      setTitle(error.message);
    }
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onUpdate}
      >
        更新第一篇
      </button>
      <p className="mt-3">{title}</p>
    </section>
  );
}
