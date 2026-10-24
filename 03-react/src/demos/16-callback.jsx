// TODO: 講義「函式型 props」。換你試試：再加一顆選項，名稱是尺。按下之後，上面那一行應變成「選到 尺」。
import { useState } from 'react';

function Choice({ name, onPick }) {
  return (
    <button
      type="button"
      className="rounded bg-stone-100 px-3 py-1"
      onClick={() => onPick(name)}
    >
      {name}
    </button>
  );
}

export default function CallbackDemo() {
  const [picked, setPicked] = useState('尚未選');

  return (
    <section>
      <p>選到 {picked}</p>
      <div className="mt-3 flex gap-2">
        <Choice name="筆" onPick={setPicked} />
        <Choice name="紙" onPick={setPicked} />
      </div>
    </section>
  );
}
