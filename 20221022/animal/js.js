// let btn=document.getElementsByTagName("button")[0]
let //初始化參數
  btn = document.querySelector('button'),
  time = document.querySelector('#time'),
  combo = document.querySelector('#combo'),
  animal = document.querySelectorAll('.cell'),
  count = 0,
  red2yellow = [];
;

btn.addEventListener('click', gamestart);
document.addEventListener('keydown', (event) => {
  if(event.repeat) return;
  keyGame(event);
})

function gamestart() {
  btn.removeEventListener('click', gamestart);
  let sec = 60;
  count = 0;
  time.textContent = sec;
  combo.textContent = count;

  const start = setInterval(function () {
    if (sec == 0) {
      clearInterval(start);
      btn.addEventListener('click', gamestart);
    }
    else {
      sec--;
      time.textContent = sec;
    }
  }, 1000);

  for (let i = 0; i < 100; i++) {
    const
      ontime = Math.floor(Math.random() * 57), // 0~56 整數
      which = Math.floor(Math.random() * 9),  // 0 ~ 8 整數
      delay = Math.floor(Math.random() * 3) + 2; //2~4 整數
    // console.log(ontime, which, delay);

    // 等N秒後執行showIt
    setTimeout(() => {
      showIt(which, delay, i);
    }, ontime * 1000);
  }
}

// 去舞台上面  (哪個位置何時下台)
function showIt(which, delay, item) {  // 負責將圖片替換於某格位置並指定曝光多久
  // console.log('舞台組報告：', which, delay, 'No' + item);
  /*
    - 指定的位置做以下事情，如果這格指定的位置是 yellow 上台
      - yellow to red
      - red show ? sec to yellow
    - 反之，是非黃色，代表不能上台=>重新再找適合的時間與位置上台
  */
  if (animal[which].title == 'yellow') {
    animal[which].src = 'red.png';
    animal[which].style.background = 'red';
    animal[which].title = 'red';
    animal[which].alt = item;

    red2yellow[item] = setTimeout(() => {  //red to yellow after time of ${delay} seconds
      animal[which].src = 'yellow.png';
      // animal[which].style.background = null;
      animal[which].removeAttribute("style");

      animal[which].title = 'yellow';
      animal[which].removeAttribute("alt");

    }, delay * 1000);
  } else {
    which = Math.floor(Math.random() * 9); //重新再定義which值;
    setTimeout(() => {
      showIt(which, delay, item);
    }, 100);
  }
}

function keyGame(nowRap) {
  // console.log(nowRap.keyCode);
  switch (nowRap.keyCode) {
    case 103:
      getCount(0); //告知getCount 有人對N號位置按下鍵盤
      break;
    case 104:
      getCount(1);
      break;
    case 105:
      getCount(2);
      break;
    case 100:
      getCount(3);
      break;
    case 101:
      getCount(4);
      break;
    case 102:
      getCount(5);
      break;
    case 97:
      getCount(6);
      break;
    case 98:
      getCount(7);
      break;
    case 99:
      getCount(8);
      break;
  }
}

function getCount(which) {
  // console.log(`你按下了${space}位置`);
  /*
    如果該位置是red
    - 分數+1
    - red to green
    - green delay 1 second to yellow
  */
  if (animal[which].title == 'red') {
    count++;
    combo.textContent = count;

    animal[which].title = 'green';
    animal[which].src = 'green.png';
    animal[which].style.background = 'green';

    const userId = animal[which].alt;
    clearTimeout(red2yellow[userId]);

    setTimeout(() => {
      animal[which].src = 'yellow.png';
      animal[which].style.background = null;
      animal[which].title = 'yellow';
    }, 1000);
  }
}
