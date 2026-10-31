import { useLocation } from 'react-router';

/**
 * 選讀。渲染時讀 useLocation，把網址拆開來畫。pathname 是路徑，search 含問號，沒有查詢時是空字串，hash 含井字號。
 * 改這些欄位不會換頁。換頁仍用連結或 navigate。
 */
export default function WherePage() {
  const location = useLocation();

  return (
    <section>
      <h1 className="text-2xl font-bold">位置</h1>
      <p className="mt-2">路徑 {location.pathname}</p>
      <p>查詢 {location.search || '（沒有）'}</p>
      <p>雜湊 {location.hash || '（沒有）'}</p>
    </section>
  );
}
