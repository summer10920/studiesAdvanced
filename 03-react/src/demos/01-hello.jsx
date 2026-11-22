export default function Hello() {
  const userName = 'Loki';

  // 回傳是採用 JSX (請當作js物件), 不是標準的 html 語法
  return (
    <section>
      <h1 className="text-2xl font-bold"> {userName}~~ 你好</h1>
      <label htmlFor="loki">這一段由元件回傳。</label>
      <input id="loki" />
    </section>
  );
}
