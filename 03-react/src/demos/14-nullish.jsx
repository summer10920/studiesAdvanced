export default function NullishDemo() {
  const price = 0;

  return (
    <section>
      <h1 className="text-2xl font-bold">台北城市漫遊</h1>
      <p>邏輯或：{price || '未定'}</p>
      <p>空值合併：{price ?? '未定'}</p>
    </section>
  );
}
