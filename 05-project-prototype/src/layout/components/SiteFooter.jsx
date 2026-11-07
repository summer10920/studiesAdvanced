import { Link } from 'react-router';
import Icon from '../../_shared/Icon.jsx';

export default function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3 md:gap-8 md:py-24">
        <div>
          <p className="font-serif text-2xl font-semibold">洛奇旅行</p>
          <p className="mt-3 text-lg text-foam">上午走路，下午留白。</p>
          <p className="mt-4 text-base leading-relaxed text-white/90">台灣本島小團，以及一條京都短團。出團前用 email 對一次名單。</p>
        </div>
        <div>
          <p className="font-semibold">聯絡我們</p>
          <p className="mt-4 flex items-start gap-2 leading-relaxed"><Icon name="call" className="mt-1 text-accent" />電話（02）0000-1111</p>
          <p className="mt-2 flex items-start gap-2 leading-relaxed"><Icon name="location_on" className="mt-1 text-accent" />100 台北市中正區教材路 8 號</p>
          <p className="mt-4 text-base leading-relaxed text-white/90">出團前以 email 確認。未成行，團費全額退回。</p>
        </div>
        <div>
          <p className="font-semibold">探索</p>
          <nav className="mt-3 flex flex-col" aria-label="頁尾">
            <Link className="inline-flex min-h-11 items-center text-foam hover:text-white" to="/tours">行程</Link>
            <Link className="inline-flex min-h-11 items-center text-foam hover:text-white" to="/about">關於</Link>
          </nav>
          <p className="mt-4 text-base leading-relaxed text-white/90">交通部觀光署旅行業執照交觀甲 999999 號</p>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-6 sm:px-6">
          <Link className="w-fit text-sm text-white/55 hover:text-white" to="/admin/login">後台登入</Link>
          <p className="text-sm text-white/55">© {new Date().getFullYear()} 洛奇旅行</p>
        </div>
      </div>
    </footer>
  );
}
