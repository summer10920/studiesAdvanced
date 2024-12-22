// 如果全域變數，影響其他地方如果又出現全域變數相同名稱的話，衝突
// 最好的方式，把這裡所有的代碼包在一個函數裡面，形成一個區間變數。這樣就不會影響到全域變數
// const init = () => { 
//   console.log(123);
// }


// init();

(function () {
  const loki = 100;
  console.log(loki * 2);
})();

// const myRoom = function () {
//   const loki = 'A';
//   console.log(`${loki}++`);
// }

// myRoom();

// 可直接 立即 呼叫 這個 匿名函式 的 表達句子
// 為了產生區間變數並執行，可以使用 IIFE

// (function () {
//   const loki = 'A';
//   console.log(`${loki}++`);
// })();

!function () {
  const loki = 'A';
  console.log(`${loki}++`);
}();
