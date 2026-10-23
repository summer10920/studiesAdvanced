// 第一步：同一支檔算出三天的標題。
// 第二步：tours 與 filterByDays 搬到 82-js-module-data.js。
// 完成寫法見 82-js-module.js.final。script 要改成 type="module"。
// 換你試試：再 export findById，印出 id 2 的標題。

const tours = [
  { id: 1, title: '台北城市漫遊', place: '台北', days: 3, price: 12800 },
  { id: 2, title: '花蓮山海三日', place: '花蓮', days: 3, price: 15900 },
  { id: 3, title: '京都紅葉散步', place: '京都', days: 5, price: 42800 },
];

const filterByDays = (list, days) => {
  return list.filter((tour) => tour.days === days);
};

const titles = filterByDays(tours, 3).map((tour) => tour.title);
console.log(titles);
console.log(tours.length);
