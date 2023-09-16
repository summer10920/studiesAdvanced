window.addEventListener('DOMContentLoaded', event => {
  var grid = document.querySelector('#lokiPark article.row');
  new Masonry(grid, { percentPosition: 'true' });

  //menu background effect
  const menuEffect = () => {
    const headerMenu = document.querySelector('nav.navbar');
    let desktopMode = getComputedStyle(headerMenu.querySelector('button')).getPropertyValue('display');

    if (scrollY > 500 || desktopMode != 'none') headerMenu.classList.remove('init');
    else headerMenu.classList.add('init');
  }

  onresize = () => {
    menuEffect();
  }
  onscroll = () => {
    menuEffect();
  }

  AOS.init();

  const
    itemStr = `cookieUsed=agree`,
    cookieNode = document.querySelector('#lokiCookie'),
    cookieAry = document.cookie.split('; ');

  if (!cookieAry.includes(itemStr)) {
    cookieNode.style.display = 'block';

    cookieNode.querySelector('.btn').onclick = function () {
      document.cookie = `${itemStr}; max-age=${60 * 60 * 24 * 180}`;
      cookieNode.remove();
    }
  }
  else cookieNode.remove();


});