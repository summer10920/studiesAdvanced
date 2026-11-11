import { useState } from 'react';

export default function ActionDemo() {
  const [message, setMessage] = useState('尚未詢問');

  const send = async (formData) => {
    setMessage('已收到詢問：' + String(formData.get('title') || '未填'));
  };

  return (
    <form action={send} className="grid max-w-sm gap-3">
      <input
        name="title"
        className="rounded border px-2 py-1"
        placeholder="想去的行程（例如台北城市漫遊）"
      />
      <button
        type="submit"
        className="rounded bg-teal-800 px-3 py-1 text-white"
      >
        送出詢問
      </button>
      <p>{message}</p>
    </form>
  );
}
