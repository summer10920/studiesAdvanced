// TODO: 講義「依賴陣列」。換你試試：按鈕改成把關鍵字設成尺。按下後應先清除舊字，再查詢尺。
import { useEffect, useState } from 'react';

export default function DepsDemo() {
  const [keyword, setKeyword] = useState('筆');

  useEffect(() => {
    console.log('查詢', keyword);
    return () => {
      console.log('清除', keyword);
    };
  }, [keyword]);

  return (
    <section>
      <p>關鍵字 {keyword}</p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setKeyword('紙')}
      >
        改查紙
      </button>
    </section>
  );
}
