// TODO: 講義「提早 return」。換你試試：把 `product` 改成一筆真的資料，名稱台北城市漫遊、價格 12800。畫面應變成卡片，說明那一行消失。
export default function EarlyDemo() {
  const product = null;

  if (!product) {
    return <p>尚未選擇行程。</p>;
  }

  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{product.title}</h2>
      <p>{product.price}</p>
    </article>
  );
}
