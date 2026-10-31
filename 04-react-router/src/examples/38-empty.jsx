const tours = [
  { id: 'taipei', title: '台北城市漫遊', price: 12800 },
  { id: 'hualien', title: '花蓮山海三日', price: 15900 },
  { id: 'kyoto', title: '京都紅葉散步', price: 42800 },
];

export default function EmptyDemo() {
  const visible = tours.filter((item) => item.price < 0);

  if (visible.length === 0) {
    return <p>沒有符合的行程。</p>;
  }

  return (
    <ul className="grid gap-2">
      {visible.map((item) => (
        <li key={item.id}>
          {item.title} {item.price}
        </li>
      ))}
    </ul>
  );
}
