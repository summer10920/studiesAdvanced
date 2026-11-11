import { useState } from 'react';

const trips = [
  { id: 1, title: '台北城市漫遊' },
  { id: 2, title: '花蓮山海三日' },
  { id: 3, title: '京都紅葉散步' },
];

export default function StatePages() {
  const [page, setPage] = useState('home');

  return (
    <section>
      <nav className="flex gap-3">
        <button type="button" onClick={() => setPage('home')}>
          首頁
        </button>
        <button type="button" onClick={() => setPage('list')}>
          清單
        </button>
      </nav>
      {page === 'home' ? (
        <h1 className="mt-4 text-2xl font-bold">首頁</h1>
      ) : (
        <ul className="mt-4 grid gap-2">
          {trips.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
