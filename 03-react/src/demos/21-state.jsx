import { useState } from 'react';

export default function CountDemo() {
  const [count, setCount] = useState(0);

  return (
    <section>
      <p>次數 {count}</p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setCount((value) => value + 1)}
      >
        加一
      </button>
    </section>
  );
}
