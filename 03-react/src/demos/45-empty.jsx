// TODO: 講義「空清單」。換你試試：條件改成價格小於 30。說明應消失，改出現筆與尺。
const products = [
  { id: 'pen', name: '筆', price: 25 },
  { id: 'paper', name: '紙', price: 40 },
  { id: 'ruler', name: '尺', price: 15 },
];

export default function EmptyDemo() {
  const visible = products.filter((item) => item.price < 0);

  if (visible.length === 0) {
    return <p>沒有符合的商品。</p>;
  }

  return (
    <ul className="grid gap-2">
      {visible.map((item) => (
        <li key={item.id}>
          {item.name} {item.price}
        </li>
      ))}
    </ul>
  );
}
