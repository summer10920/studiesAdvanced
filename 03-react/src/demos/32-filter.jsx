// TODO: 講義「filter」。換你試試：條件改成價格大於 20。畫面應變成筆與紙，尺消失。
const products = [
  { id: 'pen', name: '筆', price: 25 },
  { id: 'paper', name: '紙', price: 40 },
  { id: 'ruler', name: '尺', price: 15 },
];

export default function FilterDemo() {
  const visible = products.filter((item) => item.price < 30);

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
