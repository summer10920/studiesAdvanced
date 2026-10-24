// TODO: 講義「style 物件」。換你試試：把內距改成 `20px`，輸入框的值改成紙。 `htmlFor` 與 `id` 仍要相同。
export default function StyleDemo() {
  const panel = {
    backgroundColor: '#ffffff',
    padding: '12px',
  };

  return (
    <section style={panel} className="rounded border border-stone-200">
      <label htmlFor="item-name">名稱</label>
      <input
        id="item-name"
        readOnly
        value="筆"
        className="ml-2 rounded border px-2"
      />
    </section>
  );
}
