import { useState } from 'react';

export default function PreventDemo() {
  const [name, setName] = useState('台北城市漫遊');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('送出 ' + name);
  };

  return (
    <form onSubmit={handleSubmit} className="grid max-w-sm gap-3">
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="rounded border px-2 py-1"
      />
      <button
        type="submit"
        className="rounded bg-teal-800 px-3 py-1 text-white"
      >
        送出
      </button>
      <p>{message}</p>
    </form>
  );
}
