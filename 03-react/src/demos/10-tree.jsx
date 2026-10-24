// TODO: 講義「拆分元件」。換你試試：再排一張卡片，名稱是尺、價格是 15。標題與說明那兩個元件留著。
function PageTitle() {
  return <h1 className="text-2xl font-bold">文具</h1>;
}

function PageLead() {
  return <p className="mt-2">先拆開，再由父層排回去。</p>;
}

function Card({ name, price }) {
  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p>{price}</p>
    </article>
  );
}

export default function TreeDemo() {
  return (
    <section>
      <PageTitle />
      <PageLead />
      <div className="mt-4 grid gap-3">
        <Card name="筆" price={25} />
        <Card name="紙" price={40} />
      </div>
    </section>
  );
}
