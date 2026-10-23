// 第一步：用 for 與 push 留下 >= 80 的分數。
// 第二步：改成 filter。完成寫法見 42-js-filter.js.final。
// filter 交回新陣列，不改原陣列。
// 換你試試：留下 < 80 的分數。

const scores = [88, 92, 76, 95, 61];
const passed = [];

for (let index = 0; index < scores.length; index += 1) {
  if (scores[index] >= 80) {
    passed.push(scores[index]);
  }
}

for (let index = 0; index < passed.length; index += 1) {
  console.log(passed[index]);
}
