// TODO: 講義「更新函式」。換你試試：再排第三個更新函式，同樣加一。按一次，畫面應從 0 變成 3。Console 仍是 0。
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
      <p>次數 {count}</p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onAdd}
      >
        加二
      </button>
    </section>
  );
}
