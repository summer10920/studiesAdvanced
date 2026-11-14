import { useState } from 'react';

export default function DeriveFixedDemo() {
  const [count, setCount] = useState(2);
  const price = 12800;
  const total = price * count;

  return (
    <section>
      <p>
        {count} 人，共 {total}
      </p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setCount((value) => value + 1)}
      >
        加一人
      </button>
    </section>
  );
}
