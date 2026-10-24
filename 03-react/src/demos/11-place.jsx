// TODO: 講義「狀態的位置」。換你試試：把 `showPrice` 改成 `false`。兩張卡片都只留名稱，卡片元件的參數不要刪。
function Card({ name, price, showPrice }) {
  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{name}</h2>
      {showPrice ? <p>{price}</p> : null}
    </article>
  );
}

export default function PlaceDemo() {
  const showPrice = true;

  return (
    <section className="grid gap-3">
      <Card name="筆" price={25} showPrice={showPrice} />
      <Card name="紙" price={40} showPrice={showPrice} />
    </section>
  );
}
