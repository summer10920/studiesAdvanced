import { useState } from 'react';

export default function DeleteDemo() {
  const [message, setMessage] = useState('尚未刪除');

  const onDelete = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts/1',
        { method: 'DELETE' },
      );
      if (!response.ok) throw new Error(String(response.status));
      setMessage('已刪除 ' + response.status);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onDelete}
      >
        刪除第一篇
      </button>
      <p className="mt-3">{message}</p>
    </section>
  );
}
