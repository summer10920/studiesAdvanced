// TODO: 講義「textarea」。換你試試：加一顆按鈕，按下把備註設成空字串。字數應變成 0。
import { useState } from 'react';

export default function AreaDemo() {
  const [note, setNote] = useState('第一行');

  return (
    <section className="grid max-w-sm gap-3">
      <textarea
        value={note}
        onChange={(event) => setNote(event.target.value)}
        rows={4}
        className="rounded border px-2 py-1"
      />
      <p>字數 {note.length}</p>
    </section>
  );
}
