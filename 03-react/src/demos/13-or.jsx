// TODO: 講義「||：缺內容時補預設」。換你試試：把 place 改成「花蓮」。地點那一行應變成花蓮，備註仍是含早餐。
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
