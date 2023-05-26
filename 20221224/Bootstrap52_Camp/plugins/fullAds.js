/************************************************Ads 事件 */
function adClose() {
  // document.querySelector('#myFull').style.display = 'none';
  console.log('deleted');
  document.querySelector('#myFull').remove();
}

function ad2go() {
  open('https://shopee.tw/');
}

// document.querySelector('#myFull').onclick = adClose;
// document.querySelector('#adClose').onclick = adClose;
// document.querySelector('#myContent>img').onclick = ad2go;

document.querySelector('#myFull').addEventListener('click', adClose);

// 因為傳遞與冒泡(因為 adClose 跟 myFull 重疊都會被觸發，所以乾脆 adClose 做爽的，不需要綁event)
// document.querySelector('#adClose').addEventListener('click', adClose);

document.querySelector('#myContent>img').addEventListener('click', ad2go);


/************************************************Ads Cookie */

function findCookie(keyVal) {
  // 如果我們從cookie的string內找不到ads=watched => 回傳 true
  const cookieAry = document.cookie.split('; ');
  return !cookieAry.includes(keyVal); //有找到，回傳false
}

// const unwatch = findCookie('ads=watched');
// if (unwatch) {


//判斷是否需出現廣告
if (findCookie('ads=watched')) {
  document.querySelector('#myFull').style.opacity = 1;

  const delTime = new Date();
  delTime.setHours(23);
  delTime.setMinutes(59);
  delTime.setSeconds(59);
  document.cookie = 'ads=watched; expires=' + delTime.toUTCString();
}
else document.querySelector('#myFull').remove();