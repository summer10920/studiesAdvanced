// 關閉 React Compiler，才看得到沒有自動記憶化時的行為
'use no memo';

import { memo, useState } from 'react';

const StarPicker = memo(function StarPicker({ star, onPick }) {
  console.log('星星列渲染');

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className="text-2xl text-amber-500"
          onClick={() => onPick(n)}
        >
          {n <= star ? '★' : '☆'}
        </button>
      ))}
    </div>
  );
});

export default function UseCallbackDemo() {
  const [text, setText] = useState('');
  const [star, setStar] = useState(5);
  const handlePick = (n) => {
    setStar(n);
  };

  return (
    <section className="grid max-w-sm gap-3">
      <label className="grid gap-1">
        留言
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="rounded border px-2 py-1"
        />
      </label>
      <p>輸入字數 {text.length}</p>
      <StarPicker star={star} onPick={handlePick} />
      <p>星等 {star}</p>
    </section>
  );
}
