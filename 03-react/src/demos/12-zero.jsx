// TODO: 講義「左邊是 0 的陷阱」。換你試試：左邊改成 `count > 0`。畫面應只剩標題，那個 0 消失。
export default function ZeroDemo() {
  const count = 0;

  return (
    <section>
      <h1 className="text-2xl font-bold">台北城市漫遊</h1>
      {count && <p>人數 {count}</p>}
    </section>
  );
}
