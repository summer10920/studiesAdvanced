!function () {
  const init = () => {
    const lightBox = document.querySelector('#lokiLightBox');
    const targetCtrl = lightBox.querySelector('.control');
    const targetMain = lightBox.querySelector('.mainZone');

    document.querySelectorAll('#lokiPark .col').forEach(item => {
      const minImg = item.querySelector('img').cloneNode();
      minImg.dataset.str = item.querySelector('h5').textContent;

      minImg.onclick = function () {
        targetMain.children[0].src = this.src;
        targetMain.children[1].textContent = this.dataset.str;
      }
      //應早於插入之前但其實可順序錯，不影響記憶體位置

      targetCtrl.append(minImg);

      item.onclick = function () {
        lightBox.style.cssText = 'display:flex';
        minImg.click();
      }
    });

    lightBox.querySelector('.backdrop').onclick = function () {
      lightBox.style.cssText = 'display:none';
    }
  }
  init();
}();