// TODO: 講義「named export」。換你試試：再加一張卡片，名稱京都紅葉散步、價格 42800。引入那一行留著。
import { Card } from './15-card.jsx';

export default function BoardDemo() {
  return (
    <section className="grid gap-3">
      <Card title="台北城市漫遊" price={12800} />
      <Card title="花蓮山海三日" price={15900} />
    </section>
  );
}
