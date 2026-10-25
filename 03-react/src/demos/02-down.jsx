// TODO: 講義「由父層傳入」。換你試試：父層的常數改成「花蓮山海三日」。兩張卡片的標題都要跟著變，卡片元件裡不要寫死文字。
function Card({ title }) {
  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
    </article>
  );
}

export default function DownDemo() {
  const title = '台北城市漫遊';

  return (
    <section className="grid gap-3">
      <Card title={title} />
      <Card title={title} />
    </section>
  );
}
