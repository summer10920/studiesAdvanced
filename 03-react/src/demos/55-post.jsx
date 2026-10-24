// TODO: 講義「POST」。換你試試：標題改成「第二則」。狀態碼仍應是 201，畫面不必顯示標題也沒關係。
import { useState } from 'react';

export default function PostDemo() {
  const [message, setMessage] = useState('尚未送出');

  const onCreate = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: '新文具', body: '筆', userId: 1 }),
        },
      );
      if (!response.ok) throw new Error(String(response.status));
      const created = await response.json();
      setMessage(response.status + ' id ' + created.id);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onCreate}
      >
        新增
      </button>
      <p className="mt-3">{message}</p>
    </section>
  );
}
