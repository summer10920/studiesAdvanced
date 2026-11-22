export default function ZeroDemo() {
  const count = 0;

  return (
    <section>
      <h1 className="text-2xl font-bold">台北城市漫遊</h1>
      {count && <p>人數 {count}</p>}
    </section>
  );
}
