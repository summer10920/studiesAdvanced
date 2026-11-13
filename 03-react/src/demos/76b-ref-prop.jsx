import { useRef } from 'react';

// React 19：函式元件直接收 ref 這個 props，不必再用 forwardRef
function NameInput({ ref }) {
  return (
    <input
      ref={ref}
      className="rounded border px-2 py-1"
      placeholder="名稱"
    />
  );
}

export default function RefPropDemo() {
  const inputRef = useRef(null);

  return (
    <section className="grid max-w-sm gap-3">
      <NameInput ref={inputRef} />
      <button
        type="button"
        className="w-fit rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => inputRef.current?.focus()}
      >
        聚焦
      </button>
    </section>
  );
}
