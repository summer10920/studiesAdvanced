// TODO: 講義「邏輯且」。換你試試：把折扣改成 0。第三行應消失，前兩行留著。
export default function AndDemo() {
  const discount = 10;

  return (
    <section>
      <h1 className="text-2xl font-bold">筆</h1>
      <p>價格 25</p>
      {discount > 0 && <p>折扣 {discount}</p>}
    </section>
  );
}
