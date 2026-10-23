// TODO: 講義「可選串連」
// tour.guide?.name 讀得到名字
// other 沒有 guide，?. 得到 undefined，再用 ?? 補「未定」
// other.guide.name 維持註解。取消註解會 TypeError
// 換你試試：other 補上 guide: { name: '陳' }，印出 ?. 的結果

const tour = { title: '台北城市漫遊', guide: { name: '林' } };
const other = { title: '花蓮山海三日' };
