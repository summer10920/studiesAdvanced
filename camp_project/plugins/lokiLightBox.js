!function () {
  const init = () => {
    const lightBox = document.querySelector('#lokiLightBox');
    // const targetCtrl = document.querySelector('#lokiLightBox .control');
    const targetCtrl = lightBox.querySelector('.control');
    const targetMain = lightBox.querySelector('.mainZone');

    document.querySelectorAll('#lokiPark .col').forEach(item => {
      //畫面圖片進行複製到燈箱小圖區域
      const minImg = item.querySelector('img').cloneNode();
      // console.log(minImg);
      minImg.dataset.str = item.querySelector('h5').textContent;

      //這些小圖有click事件，要求替換主圖...
      minImg.onclick = function () {
        // targetMain.querySelector('img').src
        targetMain.children[0].src = this.src;
        targetMain.children[1].textContent = this.dataset.str;
      }
      targetCtrl.append(minImg);

      // 規劃畫面圖有click事件，呼叫燈箱 style 顯示none->flex
      item.onclick = () => {
        // document.querySelector('#lokiLightBox').style.display='flex';
        lightBox.style.cssText = 'display: flex';
        minImg.click(); //模擬小圖點擊....
      }

      // 規劃黑色區域有click事件，呼叫燈箱 style 顯示 flex->none
      lightBox.querySelector('.backdrop').onclick = () =>
        lightBox.style.cssText = 'display: none';
    });
  }

  init();
}();