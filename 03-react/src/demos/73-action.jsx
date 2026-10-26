import { useState } from 'react';

export default function ActionDemo() {
  const [title, setTitle] = useState('尚未送出');

  const send = async (formData) => {
    setTitle(String(formData.get('title') || '未填'));
  };

  return (
    <form action={send} className="grid max-w-sm gap-3">
      <input
        name="title"
        className="rounded border px-2 py-1"
        placeholder="標題"
      />
      <button
        type="submit"
        className="rounded bg-teal-800 px-3 py-1 text-white"
      >
        送出
      </button>
      <p>{title}</p>
    </form>
  );
}
