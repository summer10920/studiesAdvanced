// TODO: 講義「預設值」。換你試試：呼叫時加上 `unit="盒"`。畫面應變成 25 盒，預設的件這一次不會出現。
function Product({ name, price, unit = '件' }) {
  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p>
        {price} {unit}
      </p>
    </article>
  );
}

export default function DefaultsDemo() {
  return <Product name="筆" price={25} />;
}
