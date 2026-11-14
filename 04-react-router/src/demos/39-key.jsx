import { useState } from 'react';

function Row({ label }) {
  const [text, setText] = useState('');

  return (
    <li className="flex gap-2">
      <span>{label}</span>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        className="rounded border px-2"
      />
    </li>
  );
}

export default function KeyDemo() {
  const [rows, setRows] = useState([
    { id: 'taipei', label: '台北城市漫遊' },
    { id: 'hualien', label: '花蓮山海三日' },
  ]);

  const onRemove = () => {
    setRows((items) => items.filter((item) => item.id !== 'taipei'));
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onRemove}
      >
        刪掉台北城市漫遊
      </button>
      <ul className="mt-3 grid gap-2">
        {rows.map((item) => (
          <Row key={item.id} label={item.label} />
        ))}
      </ul>
    </section>
  );
}
