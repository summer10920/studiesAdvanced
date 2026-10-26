function Card({ title, price, showPrice }) {
  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {showPrice ? <p>{price}</p> : null}
    </article>
  );
}

export default function PlaceDemo() {
  const showPrice = true;

  return (
    <section className="grid gap-3">
      <Card title="台北城市漫遊" price={12800} showPrice={showPrice} />
      <Card title="花蓮山海三日" price={15900} showPrice={showPrice} />
    </section>
  );
}
