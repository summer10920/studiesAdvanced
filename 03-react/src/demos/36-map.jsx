// TODO: 講義「map」。換你試試：陣列再加一筆，id 是 `osaka`，名稱大阪一日，價格 9800。前三筆留著。
const tours = [
  { id: 'taipei', title: '台北城市漫遊', price: 12800 },
  { id: 'hualien', title: '花蓮山海三日', price: 15900 },
  { id: 'kyoto', title: '京都紅葉散步', price: 42800 },
];

export default function MapDemo() {
  return (
    <ul className="grid gap-2">
      {tours.map((item) => (
        <li
          key={item.id}
          className="rounded border border-stone-200 bg-white px-3 py-2"
        >
          {item.title} {item.price}
        </li>
      ))}
    </ul>
  );
}
