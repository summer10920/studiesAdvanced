// TODO: 講義「批次更新」。換你試試：按鈕裡把件數改成 5，名稱改成京都紅葉散步。按下後 Console 應多一行「渲染 京都紅葉散步 5」，而且只有這一次新增。
import { useState } from 'react';

export default function BatchDemo() {
  const [name, setName] = useState('台北城市漫遊');
  const [count, setCount] = useState(1);

  console.log('渲染', name, count);

  const onChange = () => {
    setName('花蓮山海三日');
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
