function Panel({ children }) {
  return (
    <section className="rounded border border-stone-200 bg-white p-4">
      {children}
    </section>
  );
}

export default function ChildrenDemo() {
  return (
    <Panel>
      <h1 className="text-2xl font-bold">洛奇旅行</h1>
      <p>外框在 Panel，文字在呼叫端。</p>
    </Panel>
  );
}
