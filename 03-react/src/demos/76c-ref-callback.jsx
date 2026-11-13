import { useState } from 'react';

// 放在元件外面，每次渲染都是同一個函式
function focusOnMount(node) {
  node.focus();
  console.log('輸入框出現，已聚焦');

  // React 19：ref 函式可以回傳清理函式，節點移除時執行
  return () => {
    console.log('輸入框移除，清理');
  };
}

export default function RefCallbackDemo() {
  const [open, setOpen] = useState(false);

  return (
    <section className="grid max-w-sm gap-3">
      <button
        type="button"
        className="w-fit rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setOpen(!open)}
      >
        {open ? '隱藏' : '顯示'}輸入框
      </button>
      {open && (
        <input
          ref={focusOnMount}
          className="rounded border px-2 py-1"
          placeholder="名稱"
        />
      )}
    </section>
  );
}
