// TODO: 講義「聚焦輸入框」。換你試試：再加一顆按鈕，按下把輸入框的值清空。用 `inputRef.current.value = ''`，不要加狀態。
import { useRef } from 'react';

export default function RefDemo() {
  const inputRef = useRef(null);

  const onFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <section className="grid max-w-sm gap-3">
      <input
        ref={inputRef}
        className="rounded border px-2 py-1"
        placeholder="名稱"
      />
      <button
        type="button"
        className="w-fit rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onFocus}
      >
        聚焦
      </button>
    </section>
  );
}
