// TODO: 講義「帶參數」。換你試試：再加一顆按鈕，按下把選取設成京都紅葉散步。`handlePick` 不要複製第二份。
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
          onClick={() => handlePick('台北城市漫遊')}
        >
          台北城市漫遊
        </button>
        <button
          type="button"
          className="rounded bg-stone-100 px-3 py-1"
          onClick={() => handlePick('花蓮山海三日')}
        >
          花蓮山海三日
        </button>
      </div>
    </section>
  );
}
