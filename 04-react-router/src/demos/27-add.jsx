import { useState } from 'react';

export default function AddDemo() {
  const [notes, setNotes] = useState(['台北城市漫遊', '花蓮山海三日']);

  const onAdd = () => {
    setNotes((items) => [...items, '備忘' + (items.length + 1)]);
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onAdd}
      >
        加一則
      </button>
      <ul className="mt-3 list-disc pl-5">
        {notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </section>
  );
}
