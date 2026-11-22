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
};
