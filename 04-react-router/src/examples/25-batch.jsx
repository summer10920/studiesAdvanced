import { useState } from 'react';

export default function BatchDemo() {
  const [name, setName] = useState('台北城市漫遊');
  const [count, setCount] = useState(1);

  console.log('渲染', name, count);

  const onChange = () => {
    setName('花蓮山海三日');
    setCount(3);
  };

  return (
    <section>
      <p>
        {name} × {count}
      </p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onChange}
      >
        一次改兩項
      </button>
    </section>
  );
}
