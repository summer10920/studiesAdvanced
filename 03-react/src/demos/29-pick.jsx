// TODO: 講義「帶參數」。換你試試：再加一顆按鈕，按下把選取設成尺。`handlePick` 不要複製第二份。
import { useState } from 'react';

export default function PickDemo() {
  const [picked, setPicked] = useState('尚未選');

  const handlePick = (name) => {
    setPicked(name);
  };

  return (
    <section>
      <p>選到 {picked}</p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          className="rounded bg-stone-100 px-3 py-1"
          onClick={() => handlePick('筆')}
        >
          筆
        </button>
        <button
          type="button"
          className="rounded bg-stone-100 px-3 py-1"
          onClick={() => handlePick('紙')}
        >
          紙
        </button>
      </div>
    </section>
  );
}
