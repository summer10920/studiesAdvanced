onload = () => {
  var grid = document.querySelector('#lokiPark article.row');
  var msnry = new Masonry(grid, { percentPosition: 'true' });


  //////////////////////////////////////////////////////////////////////// cookie 設定

  // 1. 取得 cookieAry, ary value ex: cookieUsed=agree
  const
    aryCookie = document.cookie.split('; '),
    nodeCookie = document.querySelector('#lokiCookie'),
    keywordCookie = 'cookieUsed=agree';

  // console.log(keywordCookie, aryCookie);

  // 2. 檢查 cookieAry 是否有關鍵字
  if (aryCookie.includes(keywordCookie)) {
    // 已同意
    nodeCookie.remove();
  } else {
    //還沒同意
    nodeCookie.style.display = 'block'; // 顯示提示

    nodeCookie.querySelector('button').onclick = () => { // 規劃按鈕事件
      // 設定 cookie
      // document.cookie = keywordCookie;   // method 1 沒指定

      // method 2，指定活到甚麼時候
      // now = new Date();
      // now.setTime(now.getTime() + (24 * 60 * 60 * 1000));
      // document.cookie = `${keywordCookie}; expires='${now.toUTCString()}`;

      // method 3， 指定活多久
      document.cookie = `${keywordCookie}; max-age=${24 * 60 * 60 * 180}`;
      nodeCookie.remove();
    };
  }


























}



