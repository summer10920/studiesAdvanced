import { useState } from 'react';

export default function TargetDemo() {
  const [info, setInfo] = useState('尚未點');

  const handleClick = (event) => {
    setInfo(
      `type：${event.type}，target：${event.target.tagName}，currentTarget：${event.currentTarget.tagName}`,
    );
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={handleClick}
      >
        點這裡的 <strong className="underline">粗體字</strong> 或旁邊
      </button>
      <p className="mt-2">{info}</p>
    </section>
  );
}
