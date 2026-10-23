// TODO: 講義「綜合練習」
// 同一支檔寫完，不要用 import / export，也不要加 type="module"
// filterByDays(list, days)：filter，days 用 ===，回傳新陣列
// titlesOf(list)：map 出 title
// findById(list, id)：find 第一筆，沒有就是 undefined
// 印出 titlesOf(filterByDays(tours, 3)) 與 findById(tours, 1)
// 不要改到傳進來的陣列，不要選取頁面元素
// 換你試試：加一筆 id 4、台南古蹟一日、台南、1 天、6800
// 再寫 totalPrice，reduce 從 0 加總 price，印出 78300

const tours = [
  { id: 1, title: '台北城市漫遊', place: '台北', days: 3, price: 12800 },
  { id: 2, title: '花蓮山海三日', place: '花蓮', days: 3, price: 15900 },
  { id: 3, title: '京都紅葉散步', place: '京都', days: 5, price: 42800 },
];
