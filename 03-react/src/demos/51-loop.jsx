// TODO: 講義「無限迴圈」。換你試試：按鈕改成把行程設成京都紅葉散步，按鈕文字一併改成「改成京都紅葉散步」。按一次後，分頁標題應是京都紅葉散步，而且只換一次。
import { useEffect, useState } from 'react';

export default function LoopDemo() {
  const [place, setPlace] = useState('台北城市漫遊');

  useEffect(() => {
    const previous = document.title;
    document.title = place;
    return () => {
      document.title = previous;
    };
  }, [place]);

  return (
    <section>
      <p>分頁標題 {place}</p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setPlace('花蓮山海三日')}
      >
        改成花蓮山海三日
      </button>
    </section>
  );
}
