// TODO: 講義「父層持有」。換你試試：起始文字改成花蓮山海三日。父層那一行與輸入框都要是花蓮山海三日。
import { useState } from 'react';

function Editor({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="rounded border px-2 py-1"
    />
  );
}

export default function LiftDemo() {
  const [draft, setDraft] = useState('台北城市漫遊');

  return (
    <section className="grid max-w-sm gap-3">
      <Editor value={draft} onChange={setDraft} />
      <p>父層看到 {draft}</p>
    </section>
  );
}
