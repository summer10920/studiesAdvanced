const askDeg = function () {
  //new Date()算出三個出發角度。
  const time = new Date();
  timeObj = {
    ns: time.getSeconds(),
    nm: time.getMinutes(),
    nh: time.getHours()
  }
  // console.log(timeObj);
  return { //角度值
    s: timeObj.ns * 6,  // 30 =>180d  45=>270d  15=>90d ns=>?s
    m: timeObj.nm * 6 + timeObj.ns * 0.1,  //15=>90, 30=>180 || 30=>3 20=>2 ns=>?
    /*
      0分30秒= 分移動0+3度  
      0分59秒=分移動 0+5.9度
      0分60秒= 分移動0+6度
      1分0秒=分移動 6+0度
      1分30秒=分移動 6+3度
    */
    h: timeObj.nh * 30 + timeObj.nm * 0.5 + timeObj.ns * (0.5 / 60)
    /*
    - 花3600秒可以移動30度
    - 知道X分Y秒，你知道移動幾度?
  
    Method 1
    - 59分59秒=>359.9916666667度
    59*60+59=3599s
  
    3599:3600=?:30
    ?=3599*30/3600
    ?=(Min*60+Sec)*30/3600
  
    Method 2
  
    每一秒等於0.00833333移動
    每一分等於0.5移動
  
    59分59秒=
    59*0.5+59*(0.5/60)
    ?=Min*0.5+Sec*(0.5/60)
    */
  }
}

// document.write(`
// <style>
//   @keyframes j_s {
//     from {transform: rotate(${posObj.s}deg);}
//     to {transform: rotate(${posObj.s + 360}deg);}
//   }
//   @keyframes j_m {
//     from {transform: rotate(${posObj.m}deg);}
//     to {transform: rotate(${posObj.m + 360}deg);}
//   }
//   @keyframes j_h {
//     from {transform: rotate(${posObj.h}deg);}
//     to {transform: rotate(${posObj.h + 360}deg);}
//   }
// </style>
// `);

const posObj = askDeg();

let cssCode = `
  @keyframes j_s {
    from {transform: rotate(${posObj.s}deg);}
    to {transform: rotate(${posObj.s + 360}deg);}
  }
  @keyframes j_m {
    from {transform: rotate(${posObj.m}deg);}
    to {transform: rotate(${posObj.m + 360}deg);}
  }
  @keyframes j_h {
    from {transform: rotate(${posObj.h}deg);}
    to {transform: rotate(${posObj.h + 360}deg);}
  }
`;
onload = function () {
  let myStyle = document.createElement('style'); //宣告一個style元素
  myStyle.appendChild(document.createTextNode(cssCode)); //指定該元素內最後面，塞入文字節點(css代碼)
  document.head.appendChild(myStyle); //插入到head元素內最後面

  ///////////////////////////////
  /*
  - 透過FN取得目前時間角度
  - 寫入行內樣式style
  - repeat
  */

}


const init = function () {
  const writeDeg = function () {
    const nowDeg = askDeg();
    document.querySelector('.osec4').style.transform = `rotate(${nowDeg.s}deg)`;
    document.querySelector('.ohour4').style.transform = `rotate(${nowDeg.h}deg)`;
    document.querySelector('.omin4').style.transform = `rotate(${nowDeg.m}deg)`;
  }
  writeDeg();
  setInterval(writeDeg, 1000);
}
init();


