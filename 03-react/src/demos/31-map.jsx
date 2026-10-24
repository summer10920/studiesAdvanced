// TODO: 講義「map」。換你試試：陣列再加一筆，id 是 `eraser`，名稱橡皮，價格 10。前三筆留著。
const products = [
  { id: 'pen', name: '筆', price: 25 },
  { id: 'paper', name: '紙', price: 40 },
  { id: 'ruler', name: '尺', price: 15 },
];

export default function MapDemo() {
  return (
    <ul className="grid gap-2">
      {products.map((item) => (
        <li
          key={item.id}
          className="rounded border border-stone-200 bg-white px-3 py-2"
        >
          {item.name} {item.price}
        </li>
      ))}
    </ul>
  );
}
