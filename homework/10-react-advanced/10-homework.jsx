// 資料在 public/data/tours.json，用 fetch('/data/tours.json') 讀取
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'homework10-favorites';

// 題目四：從 localStorage 讀出收藏編號；讀不到（null）就用 '[]'，解析後是空陣列
const readFavorites = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');

// 題目二：收藏清單元件。收藏編號由父層用 props 傳進來，移除也呼叫父層給的函式
function FavoriteList({ tours, favorites, onRemove }) {
  const picked = tours.filter((tour) => favorites.includes(tour.id));

  return (
    <section className="rounded border border-stone-300 p-4">
      <h2 className="font-semibold">收藏清單</h2>
      {picked.length === 0 ? (
        <p className="mt-2">還沒有收藏</p>
      ) : (
        <ul className="mt-2 grid gap-2">
          {picked.map((tour) => (
            <li key={tour.id} className="flex items-center gap-3">
              <span>{tour.title}</span>
              <button
                type="button"
                className="rounded border border-stone-400 px-2 py-0.5"
                onClick={() => onRemove(tour.id)}
              >
                移除
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function Homework10() {
  // 題目一：讀取狀態
  const [status, setStatus] = useState('loading');
  const [tours, setTours] = useState([]);
  // 題目二、四：收藏編號只放在這個共同的父層
  const [favorites, setFavorites] = useState(() => readFavorites());

  // 題目五：筆數在渲染時由陣列直接算，不用另一個狀態加 effect
  const count = favorites.length;

  // 題目一：載入資料。async 函式放在 effect 裡再呼叫，狀態在 await 之後才設定
  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/data/tours.json');
        if (!response.ok) throw new Error(String(response.status));
        setTours(await response.json());
        setStatus('ready');
      } catch {
        setTours([]);
        setStatus('error');
      }
    };
    load();
  }, []);

  // 題目三：分頁標題跟著收藏數量；依賴只有 count，數量沒變就不會重跑
  useEffect(() => {
    document.title = `收藏 ${count} 筆｜洛奇旅行`;
  }, [count]);

  // 題目四：收藏改變就存進 localStorage（同步到外部系統）
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const removeFavorite = (id) => {
    setFavorites((current) => current.filter((item) => item !== id));
  };

  if (status === 'loading') return <p>載入中</p>;
  if (status === 'error') return <p>讀取失敗</p>;
  if (tours.length === 0) return <p>目前沒有行程</p>;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <section>
        <p className="mb-2">已收藏 {count} 筆</p>
        <ul className="grid gap-2">
          {tours.map((tour) => {
            const picked = favorites.includes(tour.id);
            const buttonClass = picked
              ? 'rounded bg-amber-500 px-2 py-0.5 text-white'
              : 'rounded border border-stone-400 px-2 py-0.5';
            return (
              <li key={tour.id} className="flex items-center gap-3">
                <span>{tour.title}</span>
                <button
                  type="button"
                  className={buttonClass}
                  onClick={() => toggleFavorite(tour.id)}
                >
                  {picked ? '已收藏' : '收藏'}
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      <FavoriteList
        tours={tours}
        favorites={favorites}
        onRemove={removeFavorite}
      />
    </div>
  );
}
