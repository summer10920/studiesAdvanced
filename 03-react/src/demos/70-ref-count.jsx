// TODO: 講義「不觸發渲染的值」。換你試試：只累計按兩次再按顯示。畫面應是 2，Console 是 1 與 2。
import { useRef, useState } from 'react';

export default function RefCountDemo() {
  const clicks = useRef(0);
  const [shown, setShown] = useState(0);

  const onCount = () => {
    clicks.current += 1;
    console.log(clicks.current);
  };

  return (
    <section>
      <p>畫面上的次數 {shown}</p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onCount}
      >
        只累計
      </button>
      <button
        type="button"
        className="ml-2 rounded bg-stone-200 px-3 py-1"
        onClick={() => setShown(clicks.current)}
      >
        顯示
      </button>
    </section>
  );
}
