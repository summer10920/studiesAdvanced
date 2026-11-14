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
