// TODO: 講義「named export」。換你試試：再加一張卡片，名稱尺、價格 15。引入那一行留著。
import { Card } from './12-card.jsx';

export default function BoardDemo() {
  return (
    <section className="grid gap-3">
      <Card name="筆" price={25} />
      <Card name="紙" price={40} />
    </section>
  );
}
