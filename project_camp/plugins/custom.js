onload = () => {
  var grid = document.querySelector('#lokiPark article.row');
  var msnry = new Masonry(grid, { percentPosition: 'true' });


  // menu 半透明時機(desktop mode情況下根據 menu btn 決定是否透明)
  // ------------------------------------------------------
  const menuEffect = () => {
    const menuNav = document.querySelector('nav.navbar');
    const isDesktopMode = getComputedStyle(menuNav.querySelector('button')).getPropertyValue('display') === 'none';

    // console.log(innerHeight); // 視窗高度
    if (isDesktopMode && scrollY < 500) menuNav.classList.add('init');
    else menuNav.classList.remove('init');
  }

  onresize = () => menuEffect(); // 視窗改變時偵測檢查
  onscroll = () => menuEffect(); // 捲動時偵測檢查
  menuEffect();


  // AOS 動畫初始化
  // ------------------------------------------------------
  AOS.init();


  // COOKIE 判斷
  // ------------------------------------------------------
  const cookieStr = `cookieUsed=agreed`;
  if (!document.cookie.split('; ').includes(cookieStr)) {
    // 新訪客
    const cookieNode = document.createElement('div');
    cookieNode.id = 'lokiCookie';
    cookieNode.innerHTML = `
      <h4>Cookie 之使用</h4>
      <p>為提供您更完善之個人化與即時服務，本網站運用 Cookies 技術，記錄、存取及蒐集您的瀏覽使用資訊，若您欲停用 Cookies 技術支援者，請自行操作瀏覽器設定加以排除，但有可能無法使用本網站之部分服務。</p>
      <button class="btn btn-outline-light float-end">我了解</button>
    `;

    cookieNode.querySelector('.btn').addEventListener('click', () => {
      document.cookie = `${cookieStr}; max-age=${60 * 60 * 24 * 30}`;
      cookieNode.remove();
    });
    document.body.appendChild(cookieNode);
  }
}