// TODO: 講義「在元件裡使用」。換你試試：拿掉第二個 `NameList`。畫面應只剩一行名稱，網路也只該剩下一輪讀取。
import { useLocalItems } from '../hooks/useLocalItems.js';

function NameList() {
  const { status, items } = useLocalItems();
  if (status !== 'ready') return <p>{status}</p>;
  return <p>{items.map((item) => item.title).join('、')}</p>;
}

export default function TwiceDemo() {
  return (
    <section className="grid gap-2">
      <NameList />
      <NameList />
    </section>
  );
}
