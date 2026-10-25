// TODO: 講義「三元運算子」。換你試試：把庫存改成 0。標題留著，下面應變成「補貨中」。
export default function TernaryDemo() {
  const stock = 3;

  return (
    <section>
      <h1 className="text-2xl font-bold">台北城市漫遊</h1>
      {stock > 0 ? <p>有庫存</p> : <p>補貨中</p>}
    </section>
  );
}
