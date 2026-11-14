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
