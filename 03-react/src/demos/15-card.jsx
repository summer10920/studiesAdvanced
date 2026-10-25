// TODO: 講義「default export」。換你試試：預設匯出裡的價格改成 15900，名稱改成花蓮山海三日。`Card` 的參數不要改成固定文字。
export function Card({ title, price }) {
  return (
    <article className="rounded border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p>{price}</p>
    </article>
  );
}

export default function CardDemo() {
  return <Card title="台北城市漫遊" price={12800} />;
}
