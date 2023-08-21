onload = () => {
  var grid = document.querySelector('#lokiPark article.row');
  var msnry = new Masonry(grid, { percentPosition: 'true' });

  const menuNode = document.querySelector('nav.navbar');
  const activeHeight = document.querySelector('#lokiSlider').offsetHeight - menuNode.offsetHeight;
  // DOM載入完成觸發執行



  const menuEffect = () => {
    // document.scrollingElement.offsetWidth<992 螢幕寬度多少下為非電腦模式
    const btnDSP = getComputedStyle(menuNode.querySelector('button')).display;
    // console.log(btnDSP);
    // console.log(scrollY);

    if (scrollY > activeHeight || btnDSP != 'none') menuNode.classList.remove('init');
    else menuNode.classList.add('init');
  }

  onscroll = () => {
    menuEffect();
  }
  onresize = () => {
    menuEffect();
  }

  menuEffect();


  AOS.init();


  const cookieAgreeStr = 'cookieUsed=yes';
  const cookieIssetAry = document.cookie.split('; ');
  const cookieBanner = document.querySelector('#lokiCookie');

  if (!cookieIssetAry.includes(cookieAgreeStr)) {
    //當找不到，要顯示HTML與安排cookie存入綁訂於按鈕上，若同意拔除 cookieBanner
    cookieBanner.style.display = 'block';

    cookieBanner.querySelector('.btn').onclick = function () {
      document.cookie = `${cookieAgreeStr}; max-age=${60 * 60 * 24 * 30}`;
      cookieBanner.remove();
    }

  } else cookieBanner.remove();


}