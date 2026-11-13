import { useState } from 'react';

function Picker() {
  const [picked, setPicked] = useState('尚未選');

  return (
    <div className="grid gap-2">
      <p>選擇區 {picked}</p>
      <div className="flex gap-2">
        <button
          type="button"
          className="rounded bg-stone-100 px-3 py-1"
          onClick={() => setPicked('台北城市漫遊')}
        >
          台北城市漫遊
        </button>
        <button
          type="button"
          className="rounded bg-stone-100 px-3 py-1"
          onClick={() => setPicked('花蓮山海三日')}
        >
          花蓮山海三日
        </button>
      </div>
    </div>
  );
}

function Summary() {
  const [picked] = useState('尚未選');
  return <p>摘要區 {picked}</p>;
}

export default function SiblingsSplitDemo() {
  return (
    <section className="grid gap-3">
      <Picker />
      <Summary />
    </section>
  );
}
