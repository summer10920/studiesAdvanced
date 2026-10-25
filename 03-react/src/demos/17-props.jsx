// TODO: 講義「解構」。換你試試：再傳一個屬性 `unit`，值是「天」。卡片在價格後面顯示這個單位。
function Product({ title, price }) {
  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p>{price}</p>
    </article>
  );
}

export default function PropsDemo() {
  return <Product title="台北城市漫遊" price={12800} />;
}
