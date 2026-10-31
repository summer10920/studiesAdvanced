export default function TreeDemo() {
  return (
    <section>
      <h1 className="text-2xl font-bold">洛奇旅行</h1>
      <p className="mt-2">先拆開，再由父層排回去。</p>
      <div className="mt-4 grid gap-3">
        <article className="rounded border border-stone-200 bg-white p-4">
          <h2 className="text-lg font-semibold">台北城市漫遊</h2>
          <p>12800</p>
        </article>
        <article className="rounded border border-stone-200 bg-white p-4">
          <h2 className="text-lg font-semibold">花蓮山海三日</h2>
          <p>15900</p>
        </article>
      </div>
    </section>
  );
}
