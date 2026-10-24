// TODO: 講義「key」。換你試試：把 `key` 暫時改成 `index`，在紙那一列打字再刪掉筆。 看完文字黏到哪一列之後，改回 `item.id`。
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
    { id: 'pen', label: '筆' },
    { id: 'paper', label: '紙' },
  ]);

  const onRemove = () => {
    setRows((items) => items.filter((item) => item.id !== 'pen'));
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onRemove}
      >
        刪掉筆
      </button>
      <ul className="mt-3 grid gap-2">
        {rows.map((item) => (
          <Row key={item.id} label={item.label} />
        ))}
      </ul>
    </section>
  );
}
