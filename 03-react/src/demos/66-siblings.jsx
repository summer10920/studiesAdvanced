import { useState } from 'react';

function Picker({ onPick }) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        className="rounded bg-stone-100 px-3 py-1"
        onClick={() => onPick('台北城市漫遊')}
      >
        台北城市漫遊
      </button>
      <button
        type="button"
        className="rounded bg-stone-100 px-3 py-1"
        onClick={() => onPick('花蓮山海三日')}
      >
        花蓮山海三日
      </button>
    </div>
  );
}

function Summary({ picked }) {
  return <p>目前 {picked}</p>;
}

export default function SiblingsDemo() {
  const [picked, setPicked] = useState('尚未選');

  return (
    <section className="grid gap-3">
      <Picker onPick={setPicked} />
      <Summary picked={picked} />
    </section>
  );
}
