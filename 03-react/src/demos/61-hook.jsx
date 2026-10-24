// TODO: 講義「抽出讀取」。換你試試：清單每一列只留名稱，價格拿掉。Hook 的回傳不要改。
import { useLocalItems } from '../hooks/useLocalItems.js';

export default function HookDemo() {
  const { status, items } = useLocalItems();

  if (status === 'loading') return <p>載入中</p>;
  if (status === 'error') return <p>讀取失敗</p>;

  return (
    <ul className="grid gap-2">
      {items.map((item) => (
        <li key={item.id}>
          {item.name} {item.price}
        </li>
      ))}
    </ul>
  );
}
