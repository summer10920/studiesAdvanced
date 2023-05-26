(() => {
  const cookieAry = document.cookie.split('; ');

  // 判斷這個關鍵是否存在於cookie內
  const check = cookieAry.includes('cookieUse=iAgree');
  const targetNode = document.querySelector('#lokiCookie');

  if (!check) {
    // 如果不存在，顯示agree
    targetNode.style.display = 'block';

    //指定btn被click，我們要塞cookie
    targetNode.querySelector('button').onclick = function () {
      document.cookie = `cookieUse=iAgree; max-age=${60 * 60 * 24 * 30}`;
      targetNode.remove();
    };
  }
  else {
    // 存在，移除聲明視窗
    targetNode.remove();
  }
})();







// //立即函式
// !function () {
//   const lokiA = 123; //區間變數
//   console.log(lokiA);
// }();

// //直接執行

// const lokiB = 456; //全域變數
// console.log(lokiB);

// // loki();