// TODO: 講義「命名慣例」。換你試試：再加一顆按鈕，屬性是 `onClick`，處理函式叫 `handleReset`，按下把文字設回「尚未點」。
import { useState } from 'react';

export default function EventDemo() {
  const [label, setLabel] = useState('尚未點');

  const handleClick = () => {
    setLabel('已記錄');
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={handleClick}
      >
        記錄
      </button>
      <p className="mt-2">{label}</p>
    </section>
  );
}
