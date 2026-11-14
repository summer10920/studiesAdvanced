export default function OrDemo() {
  const place = '';
  const note = '含早餐';

  return (
    <section>
      <h1 className="text-2xl font-bold">台北城市漫遊</h1>
      <p>地點 {place || '未定地點'}</p>
      <p>備註 {note || '尚無備註'}</p>
    </section>
  );
}
