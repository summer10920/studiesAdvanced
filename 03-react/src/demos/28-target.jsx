// TODO: 講義「事件物件」。換你試試：Console 除了事件種類，再印出按鈕文字。畫面的那段文字維持不變。
import { useState } from 'react';

export default function TargetDemo() {
  const [label, setLabel] = useState('尚未點');

  const handleClick = (event) => {
    setLabel(event.currentTarget.textContent);
    console.log(event.type);
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={handleClick}
      >
        記錄這顆按鈕
      </button>
      <p className="mt-2">{label}</p>
    </section>
  );
}
