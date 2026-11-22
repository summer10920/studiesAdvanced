//---------------------------------------------------- public variables  (公用變數區)
const time = document.querySelector("#time");
const combo = document.querySelector("#combo");
const startBtn = document.querySelector(".control>button");
const animals = document.querySelectorAll(".imgs-box>img");

// 遊戲參數設定
const GAME_TIME = 60; // 遊戲時間
const SHOW_RANGE = [2, 4]; // 最小曝光時間 ~ 最大曝光時間
const IMG = {
  red: "./img/on.png",
  green: "./img/off.png",
  yellow: "./img/state.png",
};
const MAX_COMBO = 100; // 得分機會次數
let score = 0; // 遊戲分數

const codeMap = {
  Numpad1: 6,
  Numpad2: 7,
  Numpad3: 8,
  Numpad4: 3,
  Numpad5: 4,
  Numpad6: 5,
  Numpad7: 0,
  Numpad8: 1,
  Numpad9: 2,
};

//---------------------------------------------------- init (初始化區)
startBtn.addEventListener("click", startGame);
animals.forEach((item) =>
  item.addEventListener("click", (e) => getScore(e.target)),
);

document.addEventListener("keydown", (e) => getScore(animals[codeMap[e.code]]));

//---------------------------------------------------- private methods (私有方法區)
function startGame() {
  // 初始化遊戲
  startBtn.disabled = true;
  startBtn.textContent = "GO !!";
  let sec = GAME_TIME;
  time.textContent = sec;
  score = 0;
  combo.textContent = score;

  // 計時
  const timerId = setInterval(() => {
    if (sec === 0) {
      clearInterval(timerId);
      startBtn.disabled = false;
      startBtn.textContent = "遊戲開始";
      return;
    }
    time.textContent = --sec;
  }, 1000);

  // 產生 N 個可得分事件
  for (let i = 0; i < MAX_COMBO; i++) {
    setTimeout(
      () => {
        const space = Math.floor(Math.random() * animals.length);
        const [a, b] = SHOW_RANGE;
        const delay =
          Math.floor(Math.random() * (Math.abs(a - b) + 1)) + Math.min(a, b); // 隨機 2 ~ 4 (秒)
        toRedEvent({ space, delay });
      },
      Math.floor(Math.random() * (GAME_TIME - 3) * 1000),
    );
  }
}

// 安排紅色事件
function toRedEvent({ space, delay }) {
  if (!animals[space].src.includes("state")) {
    // 該位置不是黃色空間，重新安排位置執行, 放慢速度避免全滿的時候瞬間狂問占用瀏覽器資源
    setTimeout(
      () =>
        toRedEvent({
          space: Math.floor(Math.random() * animals.length),
          delay,
        }),
      100,
    );
    return;
  }

  animals[space].src = IMG.red; // 排入紅色

  // 這裡的 timeout 是讓紅字自消失, 然如果玩家自己消失紅色, 理所當然這裡的定時 toY 要清除
  animals[space].dataset.timeId = setTimeout(
    () => (animals[space].src = IMG.yellow),
    delay * 1000,
  );
}

// 獲取得分
function getScore(animal) {
  if (!animal.src.includes("on")) return; // 不是紅色都忽略

  combo.textContent = Math.floor((++score / MAX_COMBO) * 10000) / 100;
  animal.src = IMG.green;
  clearTimeout(animal.dataset.timeId); // 清除自消失的定時器
  animal.dataset.timeId = null; // 清除自消失的定時器 id
  setTimeout(() => (animal.src = IMG.yellow), 1000);
}
