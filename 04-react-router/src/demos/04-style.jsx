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
        value="台北城市漫遊"
        className="ml-2 rounded border px-2"
      />
    </section>
  );
}
