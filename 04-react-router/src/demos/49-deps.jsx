import { useEffect, useState } from 'react';

export default function DepsDemo() {
  const [keyword, setKeyword] = useState('台北城市漫遊');

  useEffect(() => {
    console.log('查詢', keyword);
    return () => {
      console.log('清除', keyword);
    };
  }, [keyword]);

  return (
    <section>
      <p>查詢字 {keyword}</p>
      <button
        type="button"
        className="rounded bg-teal-800 px-3 py-1 text-white"
        onClick={() => setKeyword('花蓮山海三日')}
      >
        改查花蓮山海三日
      </button>
    </section>
  );
}
