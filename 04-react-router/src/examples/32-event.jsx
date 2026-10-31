import { useState } from 'react';

export default function EventDemo() {
  const [label, setLabel] = useState('尚未點');

  const handleClick = () => {
    setLabel('已記錄');
  };

  return (
    <section>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={handleClick}
      >
        記錄
      </button>
      <p className="mt-2">{label}</p>
    </section>
  );
}
