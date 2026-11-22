// 確保畫面載入完成才會開始作業
onload = () => {
  // 素材提供的瀑布流, 非本教學範圍
  new Masonry(document.querySelector('#lokiPark article.row'), {
    percentPosition: 'true',
  });

  // menu 背景特效(隨 scroll 改變)
  const chgMenuByScroll = () => {
    document
      .querySelector('nav.navbar')
      .classList.toggle('init', scrollY <= 500 && window.innerWidth >= 992);
  };

  window.addEventListener('scroll', chgMenuByScroll);
  window.addEventListener('resize', chgMenuByScroll);
  chgMenuByScroll();

  // 啟用 AOS
  AOS.init({
    offset: 400,
  });

  // 設計 cookie 同意
  // --------------------------------
  const cookieStr = 'cookieAgree=yes';
  const cookieNode = document.querySelector('#lokiCookie');

  // 先判斷之前有無同意, 還沒同意就跳廣告給他看
  if (!document.cookie.includes(cookieStr)) {
    // 因為cookie 包含我指定的NAME, 所以不用秀
    cookieNode.remove();
  } else {
    // 因為不包含 , show it
    cookieNode.style.display = 'block';

    cookieNode.querySelector('button').addEventListener('click', () => {
      // console.log('todo');
      document.cookie = `${cookieStr}; max-age=${60 * 60 * 24 * 180}; SameSite=Lax`;
      cookieNode.remove();
    });
  }
};
