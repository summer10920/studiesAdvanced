// TODO: 講義「提早 return」。換你試試：把 `product` 改成一筆真的資料，名稱筆、價格 25。畫面應變成卡片，說明那一行消失。
export default function EarlyDemo() {
  const product = null;

  if (!product) {
    return <p>尚未選擇商品。</p>;
  }

  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p>{product.price}</p>
    </article>
  );
}
