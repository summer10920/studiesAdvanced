// TODO: 講義「第一次執行」。換你試試：在效果裡多印一行計數。清除那行留著。按下加一之後，Console 仍不該再增加。
import { useEffect, useState } from 'react';

export default function EffectMount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('效果執行');
    return () => {
      console.log('清除');
    };
  }, []);

  return (
    <section>
      <p>計數 {count}。效果只在第一次畫完後執行，請看 Console。</p>
      <button
        type="button"
        className="mt-3 rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setCount((value) => value + 1)}
      >
        加一
      </button>
    </section>
  );
}
