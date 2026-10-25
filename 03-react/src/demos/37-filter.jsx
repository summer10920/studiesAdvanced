// TODO: 講義「filter」。換你試試：條件改成價格大於 15000。畫面應變成花蓮山海三日與京都紅葉散步，台北城市漫遊消失。
const tours = [
  { id: 'taipei', title: '台北城市漫遊', price: 12800 },
  { id: 'hualien', title: '花蓮山海三日', price: 15900 },
  { id: 'kyoto', title: '京都紅葉散步', price: 42800 },
];

export default function FilterDemo() {
  const visible = tours.filter((item) => item.price < 20000);

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
