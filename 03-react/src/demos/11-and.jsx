// TODO: 講義「&&：條件成立才多畫一塊」。換你試試：把 hasTag 改成 false。標籤那一行消失，折扣、標題與價格留著。
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
