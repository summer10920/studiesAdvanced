// TODO: 講義「函式型 props」。換你試試：再加一顆選項，名稱是京都紅葉散步。按下之後，上面那一行應變成「選到 京都紅葉散步」。
import { useState } from 'react';

function Choice({ title, onPick }) {
  return (
    <button
      type="button"
      className="rounded bg-stone-100 px-3 py-1"
      onClick={() => onPick(title)}
    >
      {title}
    </button>
  );
}

export default function CallbackDemo() {
  const [picked, setPicked] = useState('尚未選');

  return (
    <section>
      <p>選到 {picked}</p>
      <div className="mt-3 flex gap-2">
        <Choice title="台北城市漫遊" onPick={setPicked} />
        <Choice title="花蓮山海三日" onPick={setPicked} />
      </div>
    </section>
  );
}
