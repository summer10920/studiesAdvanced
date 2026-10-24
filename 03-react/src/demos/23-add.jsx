// TODO: 講義「陣列新增」。換你試試：再加一顆按鈕，按下去把備忘變成空陣列。加一則的按鈕留著。
import { useState } from 'react';

export default function AddDemo() {
  const [notes, setNotes] = useState(['買筆', '買紙']);

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
