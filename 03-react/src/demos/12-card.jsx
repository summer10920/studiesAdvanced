// TODO: 講義「default export」。換你試試：預設匯出裡的價格改成 40，名稱改成紙。`Card` 的參數不要改成固定文字。
export function Card({ name, price }) {
  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p>{price}</p>
    </article>
  );
}

export default function CardDemo() {
  return <Card name="筆" price={25} />;
}
