// TODO: 講義「預設值」。換你試試：呼叫時加上 `unit="人"`。畫面應變成 12800 人，預設的天這一次不會出現。
function Product({ title, price, unit = '天' }) {
  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p>
        {price} {unit}
      </p>
    </article>
  );
}

export default function DefaultsDemo() {
  return <Product title="台北城市漫遊" price={12800} />;
}
