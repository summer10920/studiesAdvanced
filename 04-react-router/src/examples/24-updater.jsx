import { useState } from 'react';

export default function UpdaterDemo() {
  const [count, setCount] = useState(0);

  const onAdd = () => {
    setCount((value) => value + 1);
    setCount((value) => value + 1);
    console.log(count);
  };

  return (
    <section>
      <p>累加次數 {count}</p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onAdd}
      >
        正確加二
      </button>
    </section>
  );
}
