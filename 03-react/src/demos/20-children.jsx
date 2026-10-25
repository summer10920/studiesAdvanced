// TODO: 講義「children」。換你試試：在段落下面再放一行「第二段仍在外框裡」。`Panel` 的實作不要改。
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
