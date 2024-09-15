// 記得 html>body 底部宣告 <script src="plugins/custom.js"></script>
onload = () => {
  var grid = document.querySelector('#lokiPark article .row');
  var msnry = new Masonry(grid, {
    percentPosition: 'true'
  });
}