// TODO: 講義「解構」。換你試試：再傳一個屬性 `unit`，值是「支」。卡片在價格後面顯示這個單位。
function Product({ name, price }) {
  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p>{price}</p>
    </article>
  );
}

export default function PropsDemo() {
  return <Product name="筆" price={25} />;
}
