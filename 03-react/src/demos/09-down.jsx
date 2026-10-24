// TODO: 講義「由父層傳入」。換你試試：父層的常數改成「紙」。兩張卡片的標題都要跟著變，卡片元件裡不要寫死文字。
function Card({ name }) {
  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{name}</h2>
    </article>
  );
}

export default function DownDemo() {
  const name = '筆';

  return (
    <section className="grid gap-3">
      <Card name={name} />
      <Card name={name} />
    </section>
  );
}
