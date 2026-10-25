// TODO: 講義「無限迴圈」。換你試試：按鈕改成把關鍵字設回台北城市漫遊。從「台北城市漫遊!」按一次，Console 應再記一行台北城市漫遊，而且只記一行。
import { useEffect, useState } from 'react';

export default function LoopDemo() {
  const [keyword, setKeyword] = useState('台北城市漫遊');

  useEffect(() => {
    console.log('記錄', keyword);
  }, [keyword]);

  return (
    <section>
      <p>關鍵字 {keyword}</p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setKeyword((value) => value + '!')}
      >
        加一個驚嘆號
      </button>
    </section>
  );
}
