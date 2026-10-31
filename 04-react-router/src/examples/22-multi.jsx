import { useState } from 'react';

export default function MultiDemo() {
  const [name, setName] = useState('台北城市漫遊');
  const [count, setCount] = useState(1);

  return (
    <section>
      <p>
        {name} × {count}
      </p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setCount((value) => value + 1)}
      >
        加一人
      </button>
      <button
        type="button"
        className="ml-2 rounded bg-stone-200 px-3 py-1"
        onClick={() => setName('花蓮山海三日')}
      >
        改成花蓮山海三日
      </button>
    </section>
  );
}
