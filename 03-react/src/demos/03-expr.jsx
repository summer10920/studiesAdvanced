// TODO: 講義「表達式」。換你試試：段落改成三支的總價。標題仍是名稱。三支應顯示 75。
export default function ExprDemo() {
  const name = '筆';
  const price = 25;

  return (
    <section>
      <h1 className="text-2xl font-bold">{name}</h1>
      <p>兩支 {price * 2}</p>
    </section>
  );
}
