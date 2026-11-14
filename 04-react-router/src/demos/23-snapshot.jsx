import { useState } from 'react';

export default function SnapshotDemo() {
  const [count, setCount] = useState(0);

  const onAdd = () => {
    setCount(count + 1);
    setCount(count + 1);
    console.log(count);
  };

  return (
    <section>
      <p>快照次數 {count}</p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onAdd}
      >
        以為加二
      </button>
    </section>
  );
}
