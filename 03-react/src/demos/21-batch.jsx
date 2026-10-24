// TODO: 講義「批次更新」。換你試試：按鈕裡把件數改成 5，名稱改成尺。按下後 Console 應多一行「渲染 尺 5」，而且只有這一次新增。
import { useState } from 'react';

export default function BatchDemo() {
  const [name, setName] = useState('筆');
  const [count, setCount] = useState(1);

  console.log('渲染', name, count);

  const onChange = () => {
    setName('紙');
    setCount(3);
  };

  return (
    <section>
      <p>
        {name} × {count}
      </p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={onChange}
      >
        一次改兩項
      </button>
    </section>
  );
}
