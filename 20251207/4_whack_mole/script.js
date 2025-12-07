// 全域變數
// ----------------------------------------
const
  time = document.getElementById("time"),
  combo = document.getElementById("combo"),
  animals = document.querySelectorAll(".imgs-box>img"),
  startBtn = document.querySelector("button");

// 初始化執行
// ----------------------------------------
startBtn.addEventListener("click", startGame, { once: true });
// 畫面上的滑鼠 click
animals.forEach((node) => node.addEventListener("click", () => getCount(node)));
// 鍵盤指定按鍵
document.addEventListener("keydown", (e) => {
  const keyMap = {
    Numpad7: 0, Numpad8: 1, Numpad9: 2,
    Numpad4: 3, Numpad5: 4, Numpad6: 5,
    Numpad1: 6, Numpad2: 7, Numpad3: 8,
  }
  getCount(animals[keyMap[e.code]]);
});

// 函式區
// ----------------------------------------
function getCount(node) {
  if (node.src.includes('on')) {
    // 目前是紅色圖，所以要計分並轉綠色1秒後再自動回黃色
    // 但是原本這個紅色有自己的計時器會自動轉黃色，我們要取消掉
    node.src = './img/off.png';
    setTimeout(() => node.src = './img/state.png', 1000);
    combo.textContent = Number(combo.textContent) + 1;
    clearTimeout(node._toYellowTimerID);
  }
}

function startGame() {
  startBtn.disabled = true;
  combo.textContent = 0;
  let sec = 60;
  time.textContent = sec;

  const timerID = setInterval(() => {
    time.textContent = --sec;

    if (sec === 0) {
      clearInterval(timerID);
      startBtn.disabled = false;
      startBtn.addEventListener("click", startGame, { once: true });
    }
  }, 1000);

  // 規劃紅色事件
  for (let i = 0; i < 100; i++) {
    const space = Math.floor(Math.random() * 2); // rand 0~8
    const showTimer = Math.floor(Math.random() * 56000); // rand 0 ~ 55999 (ms)
    const delay = Math.floor(Math.random() * 3) + 2; // rand 2 ~ 4 sec
    setTimeout(() => toRedEvent({ space, delay }), showTimer);
  }
}

// 專門處理把畫面上的指定位置變紅且曝光多久的函式
function toRedEvent({ space, delay }) {
  const targetSpace = animals[space];

  if (targetSpace.src.includes('state')) {
    // 目前是黃色空閒狀態，可以放入新紅色
    targetSpace.src = './img/on.png';
    targetSpace._toYellowTimerID = setTimeout(() => targetSpace.src = './img/state.png', delay * 1000);
  }
  else {
    setTimeout(() => toRedEvent({ space: (space + 1) % 9, delay }), 100);
  }
}

