import { useState } from 'react';

const tours = [
  { id: 'taipei-beitou', title: '台北大稻埕與北投溫泉三日', region: '台北', theme: '城市', days: 3, price: 18600 },
  { id: 'keelung-jiufen', title: '基隆北海岸與九份兩日', region: '基隆', theme: '海岸', days: 2, price: 9200 },
  { id: 'hualien-taroko', title: '花蓮太魯閣與七星潭四日', region: '花蓮', theme: '山海', days: 4, price: 26800 },
  { id: 'taitung-chishang', title: '台東池上與成功海岸三日', region: '台東', theme: '山海', days: 3, price: 21400 },
  { id: 'tainan-anping', title: '台南府城與安平兩日', region: '台南', theme: '古都', days: 2, price: 8800 },
  { id: 'kaohsiung-qijin', title: '高雄港都與旗津三日', region: '高雄', theme: '城市', days: 3, price: 14200 },
  { id: 'kinmen-villages', title: '金門聚落與戰地三日', region: '金門', theme: '離島', days: 3, price: 16800 },
  { id: 'kyoto-nara', title: '京都嵐山、伏見與奈良五日', region: '京都', theme: '日本', days: 5, price: 52800 },
];

const themes = ['全部', '城市', '山海', '海岸', '古都', '離島', '日本'];

// 題目一：卡片元件只接收需要的資料；收藏相關的 props 是題目三加的
function TourCard({ title, days, price, favorite, onToggle }) {
  const buttonClass = favorite
    ? 'mt-2 rounded bg-amber-500 px-3 py-1 text-white'
    : 'mt-2 rounded border border-stone-400 px-3 py-1';

  return (
    <li className="rounded border border-stone-300 bg-white p-4">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1">
        <span>{days} 天</span>
        <span className="ml-4">NT${price}</span>
      </p>
      <button
        type="button"
        className={buttonClass}
        onClick={onToggle}
      >
        {favorite ? '已收藏' : '收藏'}
      </button>
    </li>
  );
}

export default function Homework09() {
  // 題目二：目前主題；題目三：收藏的編號；題目四：搜尋字
  const [theme, setTheme] = useState('全部');
  const [favorites, setFavorites] = useState([]);
  const [keyword, setKeyword] = useState('');
  // 題目五：表單欄位與報名清單
  const [name, setName] = useState('');
  const [people, setPeople] = useState('1');
  const [bookings, setBookings] = useState([]);

  // 篩選結果在渲染時直接算出來，不另外放進狀態
  const visible = tours.filter(
    (tour) =>
      (theme === '全部' || tour.theme === theme) &&
      tour.title.includes(keyword),
  );

  // 收藏用「新陣列」更新：已收藏就 filter 掉，否則用展開加上去
  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // 不要換頁
    const trimmed = name.trim();
    if (!trimmed) return; // 姓名空白不能送出
    setBookings((current) => [
      ...current,
      { id: current.length + 1, text: `${trimmed}報名 ${people} 人` },
    ]);
    setName('');
    setPeople('1');
  };

  const onClass = 'rounded bg-teal-800 px-3 py-1 text-white';
  const offClass = 'rounded border border-stone-400 px-3 py-1';

  return (
    <section className="grid gap-4">
      <p>已收藏 {favorites.length} 筆</p>

      <div className="flex flex-wrap gap-2">
        {themes.map((item) => (
          <button
            key={item}
            type="button"
            className={item === theme ? onClass : offClass}
            onClick={() => setTheme(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <input
        className="max-w-sm rounded border px-2 py-1"
        placeholder="搜尋行程標題"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
      />

      {visible.length === 0 ? (
        <p>找不到符合的行程</p>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {visible.map((tour) => (
            <TourCard
              key={tour.id}
              title={tour.title}
              days={tour.days}
              price={tour.price}
              favorite={favorites.includes(tour.id)}
              onToggle={() => toggleFavorite(tour.id)}
            />
          ))}
        </ul>
      )}

      <form className="grid max-w-sm gap-3" onSubmit={handleSubmit}>
        <input
          className="rounded border px-2 py-1"
          placeholder="姓名"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="number"
          min="1"
          className="rounded border px-2 py-1"
          value={people}
          onChange={(event) => setPeople(event.target.value)}
        />
        <button
          type="submit"
          className="rounded bg-teal-800 px-3 py-1 text-white"
        >
          送出報名
        </button>
      </form>

      <ul className="grid gap-1">
        {bookings.map((booking) => (
          <li key={booking.id}>{booking.text}</li>
        ))}
      </ul>
    </section>
  );
}
