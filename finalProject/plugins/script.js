onload = () => {
  // 只有當瀏覽器當前網頁的資源都載入完畢，才會開始執行{}內的工作
  const grid = document.querySelector('#lokiPark article.row');
  const msnry = new Masonry(grid, {
    percentPosition: 'true'
  });
}