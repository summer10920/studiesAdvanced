// TODO: 講義「數字 0」。換你試試：左邊改成 `count > 0`。畫面應只剩標題，那個 0 消失。
export default function ZeroDemo() {
  const count = 0;

  return (
    <section>
      <h1 className="text-2xl font-bold">筆</h1>
      {count && <p>件數 {count}</p>}
    </section>
  );
}
