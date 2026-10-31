export default function AndDemo() {
  const discount = 10;
  const hasTag = true;

  return (
    <section>
      <h1 className="text-2xl font-bold">台北城市漫遊</h1>
      <p>價格 12800</p>
      {discount > 0 && <p>折扣 {discount}</p>}
      {hasTag && <p>本週推薦</p>}
    </section>
  );
}
